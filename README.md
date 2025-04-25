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


## 🔍 Image Comparison Tool

The project includes a dedicated tool for comparing real and generated images using the discriminator model from the Pix2Pix GAN. This helps in objectively evaluating how well the generated images match the characteristics of real images.

### Tool Description

The `compare_images.py` script uses the trained discriminator model (`pix2pix_disc_180.pth`) to analyze both real and generated images and produce similarity metrics. The discriminator was trained to distinguish between real and fake images, making it an excellent tool for evaluating generation quality.

### How to Use

```bash
python compare_images.py --real "path/to/real/image.png" --generated "path/to/generated/image.png"
```

Optional arguments:
- `--disc_checkpoint`: Path to the discriminator checkpoint (default: "models/checkpoints/pix2pix_disc_180.pth")
- `--config`: Path to the config file (default: "config.yaml")
- `--device`: Device to use (CPU or CUDA, default: uses value from config)

### Understanding the Metrics

The script provides several metrics to evaluate the similarity between real and generated images:

| Metric | Description | Interpretation |
|--------|-------------|----------------|
| **Real image score** | How realistic the real image appears to the discriminator | Higher values (closer to 1) indicate the image looks more realistic |
| **Generated image score** | How realistic the generated image appears to the discriminator | Higher values (closer to 1) indicate the image looks more realistic |
| **Realism score** | Same as the generated image score | Values above 0.7 indicate high realism |
| **Similarity ratio** | Ratio of generated image score to real image score | Closer to 1 means the generated image is more similar to real images |
| **Discriminator difference** | Absolute difference between real and generated scores | Lower values indicate better similarity |

### Example Output

```
Similarity Analysis Results:
  Real image score: 0.6072 (higher is more realistic)
  Generated image score: 0.4862 (higher is more realistic)
  Realism score: 0.4862 (0-1, higher is more realistic)
  Similarity ratio: 0.8007 (closer to 1 means more similar)
  Discriminator difference: 0.1210 (lower means more similar)

Interpretation:
  The generated image doesn't appear very realistic to the discriminator.
  The generated image has good similarity to the real image.
```

In this example:
- The generated image received a moderate realism score (0.4862)
- The similarity ratio (0.8007) indicates good preservation of the real image's characteristics
- The discriminator can still distinguish between the real and generated images, but they share many similar features

This tool is especially useful for:
1. Comparing different model versions or configurations
2. Identifying which types of images the model handles well or poorly
3. Providing quantitative metrics for model quality beyond traditional methods like PSNR or SSIM


## 📝 Notes and Best Practices

- Make sure your virtual environment is activated before running any commands
- The model requires a CUDA-capable GPU for optimal performance
- Check `config.yaml` for model and training parameters
- Ensure all required dependencies are installed before running the scripts

## 🔗 Links

- [GitHub Repository](https://github.com/vaibhav-kadam3107/SAR-to-RGB)
- [Live Demo](https://sar-to-rgb.vercel.app/) (Coming Soon)
- [Report Issues](https://github.com/vaibhav-kadam3107/SAR-to-RGB/issues)
