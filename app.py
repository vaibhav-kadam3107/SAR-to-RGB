from flask import Flask, render_template, request, jsonify, send_file
import os
from pathlib import Path
import onnxruntime as ort
from PIL import Image
import numpy as np
import uuid
import shutil
from datetime import datetime
from werkzeug.utils import secure_filename

# Get the absolute path to the project directory
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

# Create Flask app with the correct template folder
app = Flask(__name__, 
            template_folder=os.path.join(BASE_DIR, 'frontend', 'templates'),
            static_folder=os.path.join(BASE_DIR, 'frontend', 'static'))

# Configuration
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'frontend', 'static', 'uploads')
app.config['OUTPUT_FOLDER'] = os.path.join(BASE_DIR, 'frontend', 'static', 'outputs')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure upload and output directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

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

@app.route('/sar2rgb')
def sar2rgb():
    return render_template('sar2rgb.html')

@app.route('/gallery')
def gallery():
    # Get all input and output images
    input_images = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if allowed_file(f)]
    output_images = [f for f in os.listdir(app.config['OUTPUT_FOLDER']) if allowed_file(f)]
    
    # Sort by creation time (newest first)
    input_images.sort(key=lambda x: os.path.getctime(os.path.join(app.config['UPLOAD_FOLDER'], x)), reverse=True)
    output_images.sort(key=lambda x: os.path.getctime(os.path.join(app.config['OUTPUT_FOLDER'], x)), reverse=True)
    
    return render_template('gallery.html', 
                         input_images=input_images,
                         output_images=output_images)

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
            model_path = os.path.join(BASE_DIR, 'sar2rgb.onnx')
            sess = ort.InferenceSession(model_path)
            
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

# Add a custom filter for the templates
@app.template_filter('now')
def now_filter(format_string):
    """Return the current time formatted according to format_string"""
    if format_string == 'year':
        return datetime.now().year
    return datetime.now().strftime(format_string)

if __name__ == '__main__':
    app.run(debug=True)