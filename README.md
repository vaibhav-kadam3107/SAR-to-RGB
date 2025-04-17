# SAR to RGB Converter

<div align="center">
  <img src="Frontend/public/isro-logo.png" alt="ISRO Logo" width="120"/>
  <h3>SAR to RGB Image Conversion Tool</h3>
  <p>An advanced tool for converting Synthetic Aperture Radar (SAR) images to RGB format using deep learning</p>
</div>

## 📋 Project Summary

The SAR to RGB Converter is a cutting-edge application developed by students from Vishwakarma Institute of Technology, Pune. This tool enables researchers, scientists, and analysts to transform complex Synthetic Aperture Radar (SAR) imagery into intuitive RGB visualizations while preserving critical information.

### 🚀 Key Features

- **Advanced AI Processing**: State-of-the-art neural networks trained on satellite imagery
- **High Precision**: Accurate color mapping preserving critical terrain details
- **Fast Conversion**: Process complex SAR images in seconds with optimized algorithms
- **User-friendly Interface**: Intuitive web interface for easy image uploading and conversion
- **Result Comparison**: View before/after comparisons of processed images
- **Image Gallery**: Browse previously converted images for reference

### 🛠️ Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Python, Flask
- **AI Model**: PyTorch, ONNX Runtime
- **Image Processing**: OpenCV, PIL
- **Evaluation Metrics**: PSNR, SSIM, MSE

## 🔧 Setup Instructions

Follow these steps to set up and run the project:

To run the frontend Open First Terminal

```bash
cd Frontend
```

```bash
npm install --force
```

```bash
npm run dev
```

Now to run the Backend Open second Terminal

```bash
python backend/app.py
```

To Just check the Model (Train , Test)

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
venv\Scripts\activate
```

3. Install required dependencies:
```bash
pip install -r requirements.txt
```

### Running Inference with ONNX Model

```bash
python torch2onnx.py
```

To process images using the ONNX model:
```bash
python onnx_inference.py --model sar2rgb.onnx --input input --output output
```

This will:
- Process all images from the `input` folder
- Apply the model to each image
- Save processed images to the `output` folder with "_processed" suffix
- Support multiple image formats (jpg, jpeg, png, bmp, tiff)

## 📁 Project Structure

```
SAR-to-RGB/
├── Frontend/                  # Next.js frontend application
│   ├── app/                   # Next.js app router
│   │   ├── about/             # About page
│   │   ├── convert/           # Conversion page
│   │   ├── gallery/           # Gallery page
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   ├── public/                # Static assets
│   └── styles/                # CSS and styling
│
├── Backend/                   # Flask backend server
│   ├── static/                # Static files
│   │   ├── real/              # Original SAR images
│   │   └── outputs/           # Converted RGB images
│   ├── models/                # Saved AI models
│   ├── utils/                 # Utility functions
│   └── app.py                 # Flask application
│
├── Model/                     # Model development
│   ├── input/                 # Input images for inference
│   ├── output/                # Processed images from inference
│   ├── outputs/               # Training and testing outputs
│   │   ├── generated_images/  # Generated images from testing
│   │   └── metrics/           # Evaluation metrics
│   ├── config.yaml            # Configuration file
│   ├── train.py               # Training script
│   ├── test.py                # Testing script
│   ├── torch2onnx.py          # PyTorch to ONNX conversion
│   └── onnx_inference.py      # ONNX inference script
│
├── venv/                      # Virtual environment (not tracked)
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## 📊 Results

### Performance Metrics

The model achieves impressive results in converting SAR imagery to RGB format:

| Metric | Value | Interpretation |
|--------|-------|----------------|
| **MSE** | 496.5739 | Mean Squared Error between original and generated images |
| **PSNR** | 21.17 dB | Peak Signal-to-Noise Ratio (higher is better) |
| **SSIM** | 0.5920 | Structural Similarity Index (closer to 1 is better) |

### Sample Results

The converted images preserve important details while providing natural coloration:

- Original SAR images are stored in: `backend/static/real`
- Converted RGB images are stored in: `backend/static/outputs`

<details>
<summary>View Result Examples</summary>
<br>
<p align="center">
  <strong>Real Img - Output Img</strong><br>
  <img src="backend\static\real\rgb_20250408_165816_2f8a55f1.png" alt="Original SAR" width="400"/>
  <img src="backend\static\outputs\rgb_20250408_165816_2f8a55f1.png" alt="Converted RGB" width="400"/>
</p>
</details>


## 📝 Notes and Best Practices

- Make sure your virtual environment is activated before running any commands
- The model requires a CUDA-capable GPU for optimal performance
- Check `config.yaml` for model and training parameters
- Ensure all required dependencies are installed before running the scripts

## 🔗 Links

- [GitHub Repository](https://github.com/vaibhav-kadam3107/SAR-to-RGB)
- [Live Demo](https://sar-to-rgb.vercel.app/) (Coming Soon)
- [Report Issues](https://github.com/vaibhav-kadam3107/SAR-to-RGB/issues)
