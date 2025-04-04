from flask import Flask, request, jsonify, send_from_directory
import os
import datetime
import uuid
import numpy as np
import onnxruntime as ort
from PIL import Image
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Get the absolute path to the project directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configure upload and output folders
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'static', 'uploads')
app.config['OUTPUT_FOLDER'] = os.path.join(BASE_DIR, 'static', 'outputs')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'tif', 'tiff'}

# Create directories if they don’t exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Load the ONNX model
model_path = os.path.join(BASE_DIR, 'sar2rgb.onnx')
session = ort.InferenceSession(model_path)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(original_filename):
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    ext = os.path.splitext(original_filename)[1]
    return f"{timestamp}_{uuid.uuid4().hex[:8]}{ext}"

def predict(image, sess):
    image = image.resize((256, 256))
    img_array = np.array(image).astype(np.float32) / 255.0
    img_array = np.transpose(img_array, (2, 0, 1))
    img_array = np.expand_dims(img_array, axis=0)
    input_name = sess.get_inputs()[0].name
    output_name = sess.get_outputs()[0].name
    result = sess.run([output_name], {input_name: img_array})
    output = result[0][0]
    output = np.transpose(output, (1, 2, 0))
    output = np.clip(output * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(output)

@app.route('/process', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    filename = generate_unique_filename(secure_filename(file.filename))
    input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    output_path = os.path.join(app.config['OUTPUT_FOLDER'], f"rgb_{filename}")
    try:
        file.save(input_path)
        input_image = Image.open(input_path).convert("RGB")
        output_image = predict(input_image, session)
        output_image.save(output_path)
        return jsonify({
            'success': True,
            'original': f'/static/uploads/{filename}',
            'processed': f'/static/outputs/rgb_{filename}'
        })
    except Exception as e:
        if os.path.exists(input_path):
            os.remove(input_path)
        return jsonify({'error': str(e)}), 500

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    try:
        input_images = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.endswith(tuple(ALLOWED_EXTENSIONS))]
        output_images = [f for f in os.listdir(app.config['OUTPUT_FOLDER']) if f.startswith("rgb_")]
        input_images.sort(reverse=True)
        output_images.sort(reverse=True)
        gallery_items = []
        for output_img in output_images:
            input_img = output_img[4:]
            if input_img in input_images:
                creation_time = os.path.getctime(os.path.join(app.config['OUTPUT_FOLDER'], output_img))
                date_time = datetime.datetime.fromtimestamp(creation_time)
                gallery_items.append({
                    'filename': input_img,
                    'original': f'/static/uploads/{input_img}',
                    'processed': f'/static/outputs/{output_img}',
                    'date': date_time.strftime('%Y-%m-%d'),
                    'time': date_time.strftime('%H:%M:%S'),
                    'location': 'ISRO, India'
                })
        return jsonify({'success': True, 'images': gallery_items})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
