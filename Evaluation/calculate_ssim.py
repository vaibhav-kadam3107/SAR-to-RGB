import os
import numpy as np
from skimage.metrics import structural_similarity as ssim
from PIL import Image
from tqdm import tqdm

def load_image(path):
    image = Image.open(path).convert("RGB").resize((256, 256))
    return np.array(image)

def compute_ssim(real_dir, fake_dir):
    scores = []
    print("\n📂 Real images:", os.listdir(real_dir))
    print("📂 Fake images:", os.listdir(fake_dir))

    for filename in tqdm(os.listdir(real_dir)):
        real_path = os.path.join(real_dir, filename)
        fake_path = os.path.join(fake_dir, filename)

        if not os.path.exists(fake_path):
            print(f"⚠️ Skipping, fake not found for: {filename}")
            continue

        print(f"✅ Processing: {filename}")
        real_img = load_image(real_path)
        fake_img = load_image(fake_path)

        try:
            ssim_score = ssim(real_img, fake_img, channel_axis=-1, data_range=255)
            scores.append(ssim_score)
        except ValueError as e:
            print(f"❌ Error processing {filename}: {e}")
            continue

    if scores:
        avg_score = np.mean(scores)
        print(f"\n✅ Average SSIM Score: {avg_score:.4f}")
    else:
        print("\n❌ No valid image pairs found. Check file names and extensions.")

# Change these paths based on your setup
real_images_folder = "backend/static/real"
fake_images_folder = "backend/static/outputs"

compute_ssim(real_images_folder, fake_images_folder)
