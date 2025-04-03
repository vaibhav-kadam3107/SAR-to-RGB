from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import cv2
import numpy as np
from PIL import Image
import io

# Get the absolute path to the project directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

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

def convert_sar_to_rgb(image_path):
    # Read the image
    img = cv2.imread(image_path)
    
    # Convert to grayscale if not already
    if len(img.shape) == 3:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        gray = img
    
    # Apply histogram equalization
    equalized = cv2.equalizeHist(gray)
    
    # Create RGB channels
    r = equalized
    g = cv2.GaussianBlur(equalized, (5, 5), 0)
    b = cv2.GaussianBlur(equalized, (7, 7), 0)
    
    # Merge channels
    rgb = cv2.merge([r, g, b])
    
    return rgb

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    # Get list of processed images
    images = []
    for filename in os.listdir(app.config['OUTPUT_FOLDER']):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            output_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
            
            # Get file creation time
            timestamp = os.path.getctime(output_path)
            date = datetime.fromtimestamp(timestamp).strftime('%B %d, %Y')
            
            images.append({
                'title': f'SAR Image {filename}',
                'description': 'Converted SAR to RGB image',
                'date': date,
                'url': f'/static/outputs/{filename}'
            })
    
    # Sort images by date (newest first)
    images.sort(key=lambda x: x['date'], reverse=True)
    
    return render_template('gallery.html', images=images)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/process', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No file selected'})
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
        
        # Save uploaded file
        file.save(input_path)
        
        try:
            # Convert SAR to RGB
            rgb_image = convert_sar_to_rgb(input_path)
            
            # Save the processed image
            cv2.imwrite(output_path, rgb_image)
            
            return jsonify({
                'success': True,
                'output_url': f'/static/outputs/{filename}'
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})
    
    return jsonify({'success': False, 'error': 'Invalid file type'})

if __name__ == '__main__':
    app.run(debug=True) 