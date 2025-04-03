import argparse
import numpy as np
import onnxruntime as ort
from PIL import Image
import os
from pathlib import Path


def predict(input_image, sess):
    # Preprocess the input image (e.g., resize, normalize)
    input_image = input_image.resize((256, 256))  # Adjust size as needed
    input_image = np.array(input_image).transpose(2, 0, 1)  # HWC to CHW
    input_image = input_image.astype(np.float32) / 255.0  # Normalize to [0,1]
    input_image = (input_image - 0.5) / 0.5  # Normalize to [-1,1]
    input_image = np.expand_dims(input_image, axis=0)  # Add batch dimension

    # Run the model
    inputs = {sess.get_inputs()[0].name: input_image}
    output = sess.run(None, inputs)

    # Post-process the output image (if necessary)
    output_image = output[0].squeeze().transpose(1, 2, 0)  # CHW to HWC
    output_image = (output_image + 1) / 2  # Scale to [0,1]
    output_image = (output_image * 255).astype(np.uint8)  # Denormalize to [0,255]

    return Image.fromarray(output_image)


def process_image(input_path, output_path, sess, input_dir):
    try:
        # Load the input image and ensure it's in RGB mode
        input_image = Image.open(input_path).convert("RGB")
        
        # If the input is PNG, convert to JPG format
        if input_path.suffix.lower() == '.png':
            # Create a temporary JPG path
            temp_jpg_path = input_path.with_suffix('.jpg')
            # Save as JPG
            input_image.save(temp_jpg_path, 'JPEG', quality=95)
            # Update input_path to use the JPG version
            input_path = temp_jpg_path
        
        # Perform prediction
        output_image = predict(input_image, sess)
        
        # Save the output image
        output_image.save(output_path)
        print(f"Processed: {input_path.name} -> {output_path.name}")
        
        # Clean up temporary JPG file if it was created
        if input_path.suffix.lower() == '.jpg' and input_path != input_dir / input_path.name:
            input_path.unlink()
            
        return True
    except Exception as e:
        print(f"Error processing {input_path.name}: {str(e)}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Perform inference on images using an ONNX model."
    )
    parser.add_argument(
        "--model",
        type=str,
        required=True,
        help="Path to the ONNX model file (e.g., sar2rgb.onnx)",
    )
    parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="Path to the input folder containing images",
    )
    parser.add_argument(
        "--output",
        type=str,
        required=True,
        help="Path to save the output images",
    )

    args = parser.parse_args()

    # Create output directory if it doesn't exist
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Load the ONNX model
    sess = ort.InferenceSession(args.model)

    # Get all image files from input directory
    input_dir = Path(args.input)
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff'}
    input_files = [f for f in input_dir.iterdir() if f.suffix.lower() in image_extensions]

    if not input_files:
        print(f"No image files found in {input_dir}")
        return

    print(f"Found {len(input_files)} images to process")
    
    # Process each image
    successful = 0
    for input_path in input_files:
        output_path = output_dir / f"{input_path.stem}_processed{input_path.suffix}"
        if process_image(input_path, output_path, sess, input_dir):
            successful += 1

    print(f"\nProcessing complete!")
    print(f"Successfully processed: {successful}/{len(input_files)} images")
    print(f"Output saved to: {output_dir}")


if __name__ == "__main__":
    main()
