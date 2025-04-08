import os
import numpy as np
from PIL import Image
from tqdm import tqdm
from sklearn.metrics import mean_squared_error

def load_image(path):
    image = Image.open(path).convert("RGB").resize((256, 256))
    return np.array(image)

def compute_mse(real_dir, fake_dir):
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

        # Flatten to 1D vectors for MSE calculation
        mse_score = mean_squared_error(real_img.flatten(), fake_img.flatten())
        scores.append(mse_score)

    if scores:
        avg_score = np.mean(scores)
        print(f"\n✅ Average MSE Score: {avg_score:.4f}")
    else:
        print("\n❌ No valid image pairs found. Check file names and extensions.")

# Update paths as per your directory structure
real_images_folder = "backend/static/real"
fake_images_folder = "backend/static/outputs"

compute_mse(real_images_folder, fake_images_folder)
