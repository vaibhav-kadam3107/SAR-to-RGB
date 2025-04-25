"""
Compare Images Script

This script compares a real image with a generated image using the discriminator
model from a Pix2Pix GAN. The discriminator provides a similarity score indicating
how well the generated image matches the characteristics of real images.
"""

import argparse
from pathlib import Path

import torch
import numpy as np
from torchvision.transforms import v2
from PIL import Image

from utils.config import Config
from src.pix2pix import Pix2Pix


def preprocess_image(image_path, device):
    """
    Preprocess an image for model input.
    
    Args:
        image_path: Path to the image file
        device: PyTorch device
        
    Returns:
        Preprocessed image tensor
    """
    img = Image.open(image_path).convert("RGB")
    
    transforms = v2.Compose(
        [
            v2.ToImage(),
            v2.Resize((256, 256)),
            v2.ToDtype(torch.float32, scale=True),
            v2.Normalize(mean=[0.5], std=[0.5]),
        ]
    )
    
    return transforms(img).unsqueeze(0).to(device)


def calculate_similarity(disc_model, real_img, gen_img, is_conditional=True):
    """
    Calculate similarity between real and generated images using the discriminator.
    
    Args:
        disc_model: The discriminator model
        real_img: Real image tensor
        gen_img: Generated image tensor
        is_conditional: Whether the model is a conditional GAN
        
    Returns:
        Dictionary with similarity scores
    """
    with torch.no_grad():
        # For conditional GAN, we need to concatenate the input with the output
        if is_conditional:
            # Since we don't have the original input image that was used to generate
            # the gen_img, we'll use the real_img as an approximation
            real_input = real_img
            real_AB = torch.cat([real_input, real_img], dim=1)  # Concat channels
            fake_AB = torch.cat([real_input, gen_img], dim=1)
        else:
            real_AB = real_img
            fake_AB = gen_img
        
        # Get discriminator predictions
        pred_real = disc_model(real_AB)
        pred_fake = disc_model(fake_AB)
        
        # Convert predictions to probabilities (0-1 range)
        pred_real_prob = torch.sigmoid(pred_real).mean().item()
        pred_fake_prob = torch.sigmoid(pred_fake).mean().item()
        
        # Calculate similarity metrics
        realism_score = pred_fake_prob  # How real does the fake image look (0-1)
        similarity_ratio = pred_fake_prob / pred_real_prob if pred_real_prob > 0 else 0
        
        return {
            "real_score": pred_real_prob,
            "generated_score": pred_fake_prob,
            "realism_score": realism_score,
            "similarity_ratio": similarity_ratio,
            "discriminator_difference": abs(pred_real_prob - pred_fake_prob)
        }


def main():
    parser = argparse.ArgumentParser(description="Compare real and generated images using Pix2Pix discriminator")
    parser.add_argument("--real", required=True, help="Path to the real image")
    parser.add_argument("--generated", required=True, help="Path to the generated image")
    parser.add_argument("--disc_checkpoint", default="models/checkpoints/pix2pix_disc_180.pth", 
                        help="Path to the discriminator checkpoint")
    parser.add_argument("--config", default="config.yaml", help="Path to the config file")
    parser.add_argument("--device", default=None, 
                        help="Device to use (will use config value if not specified)")
    
    args = parser.parse_args()
    
    print(f"Comparing images:\n  Real: {args.real}\n  Generated: {args.generated}")
    
    # Load configuration
    config = Config(args.config)
    
    # Set device
    device_name = args.device if args.device else config["inference"]["device"]
    device = torch.device(device_name)
    print(f"Using device: {device}")
    
    # Create model - we use is_train=True to load the discriminator
    model = (
        Pix2Pix(
            c_in=config["model"]["c_in"],
            c_out=config["model"]["c_out"],
            is_train=True,
            netD=config["model"]["netD"],
            is_CGAN=config["model"]["is_CGAN"],
            c_hid=config["model"]["c_hid"],
            n_layers=config["model"]["n_layers"],
        )
        .to(device)
        .eval()
    )
    
    # Check for discriminator checkpoint
    disc_checkpoint = Path(args.disc_checkpoint)
    if not disc_checkpoint.exists():
        raise FileNotFoundError(
            f"Discriminator checkpoint file not found: {disc_checkpoint}"
        )
    
    # Load the discriminator model only
    disc_state_dict = torch.load(disc_checkpoint, map_location=device)
    model.disc.load_state_dict(disc_state_dict)
    print(f"Loaded discriminator checkpoint from {disc_checkpoint}")
    
    # Check if image files exist
    real_img_path = Path(args.real)
    gen_img_path = Path(args.generated)
    
    if not real_img_path.exists() or not real_img_path.is_file():
        raise FileNotFoundError(f"Real image file not found: {real_img_path}")
    
    if not gen_img_path.exists() or not gen_img_path.is_file():
        raise FileNotFoundError(f"Generated image file not found: {gen_img_path}")
    
    # Preprocess images
    real_img = preprocess_image(real_img_path, device)
    gen_img = preprocess_image(gen_img_path, device)
    
    # Calculate similarity
    similarity = calculate_similarity(
        model.disc, 
        real_img, 
        gen_img, 
        is_conditional=config["model"]["is_CGAN"]
    )
    
    # Display results
    print("\nSimilarity Analysis Results:")
    print(f"  Real image score: {similarity['real_score']:.4f} (higher is more realistic)")
    print(f"  Generated image score: {similarity['generated_score']:.4f} (higher is more realistic)")
    print(f"  Realism score: {similarity['realism_score']:.4f} (0-1, higher is more realistic)")
    print(f"  Similarity ratio: {similarity['similarity_ratio']:.4f} (closer to 1 means more similar)")
    print(f"  Discriminator difference: {similarity['discriminator_difference']:.4f} (lower means more similar)")
    
    # Interpretation
    print("\nInterpretation:")
    if similarity['realism_score'] > 0.7:
        print("  The generated image appears highly realistic to the discriminator.")
    elif similarity['realism_score'] > 0.5:
        print("  The generated image appears moderately realistic to the discriminator.")
    else:
        print("  The generated image doesn't appear very realistic to the discriminator.")
        
    if similarity['similarity_ratio'] > 0.9:
        print("  The generated image is very similar to the real image in style and content.")
    elif similarity['similarity_ratio'] > 0.7:
        print("  The generated image has good similarity to the real image.")
    else:
        print("  The generated image differs significantly from the real image.")


if __name__ == "__main__":
    main()

