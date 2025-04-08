# SAR-Image-Colour

## Setup Instructions

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

## Project Structure

```
project/
├── input/              # Input images for inference
├── output/            # Processed images from inference
├── outputs/           # Training and testing outputs
│   ├── generated_images/  # Generated images from testing
│   └── metrics/          # Evaluation metrics
├── config.yaml        # Configuration file
├── requirements.txt   # Project dependencies
├── train.py          # Training script
├── test.py           # Testing script
└── onnx_inference.py # ONNX inference script
```

## Results

For Img - 

real images folder = "backend/static/real"
fake images folder = "backend/static/outputs"

✅ Average MSE Score: 496.5739  
✅ Average PSNR Score: 21.17 dB 
✅ Average SSIM Score: 0.5920


## Notes

- Make sure your virtual environment is activated before running any commands
- The model requires a CUDA-capable GPU for optimal performance
- Check `config.yaml` for model and training parameters
- Ensure all required dependencies are installed before running the scripts


