from flask import Flask, render_template, request, jsonify, send_file
import os
from pathlib import Path
import onnxruntime as ort
from PIL import Image
import numpy as np
import uuid
import shutil
from datetime import datetime

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
OUTPUT_FOLDER = 'static/outputs'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Create folders if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(original_filename):
    # Get timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    # Get original extension
    ext = os.path.splitext(original_filename)[1]
    # Create unique filename with timestamp
    return f"{timestamp}_{str(uuid.uuid4())[:8]}{ext}"

def predict(input_image, sess):
    # Preprocess the input image
    input_image = input_image.resize((256, 256))
    input_image = np.array(input_image).transpose(2, 0, 1)
    input_image = input_image.astype(np.float32) / 255.0
    input_image = (input_image - 0.5) / 0.5
    input_image = np.expand_dims(input_image, axis=0)

    # Run the model
    inputs = {sess.get_inputs()[0].name: input_image}
    output = sess.run(None, inputs)

    # Post-process the output image
    output_image = output[0].squeeze().transpose(1, 2, 0)
    output_image = (output_image + 1) / 2
    output_image = (output_image * 255).astype(np.uint8)

    return Image.fromarray(output_image)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Generate unique filename with timestamp
            filename = generate_unique_filename(file.filename)
            input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            output_filename = f"processed_{filename}"
            output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
            
            # Save uploaded file
            file.save(input_path)
            
            # Load the ONNX model
            sess = ort.InferenceSession("sar2rgb.onnx")
            
            # Process the image
            input_image = Image.open(input_path).convert("RGB")
            output_image = predict(input_image, sess)
            output_image.save(output_path)
            
            return jsonify({
                'success': True,
                'input_url': f'/static/uploads/{filename}',
                'output_url': f'/static/outputs/{output_filename}'
            })
            
        except Exception as e:
            # If there's an error, try to clean up any files that were created
            if os.path.exists(input_path):
                os.remove(input_path)
            if os.path.exists(output_path):
                os.remove(output_path)
            return jsonify({'error': str(e)}), 500
            
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/gallery')
def gallery():
    # Get all input and output images
    input_images = [f for f in os.listdir(UPLOAD_FOLDER) if allowed_file(f)]
    output_images = [f for f in os.listdir(OUTPUT_FOLDER) if allowed_file(f)]
    
    # Sort by creation time (newest first)
    input_images.sort(key=lambda x: os.path.getctime(os.path.join(UPLOAD_FOLDER, x)), reverse=True)
    output_images.sort(key=lambda x: os.path.getctime(os.path.join(OUTPUT_FOLDER, x)), reverse=True)
    
    return render_template('gallery.html', 
                         input_images=input_images,
                         output_images=output_images)

if __name__ == '__main__':
    app.run(debug=True) 