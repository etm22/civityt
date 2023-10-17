from PIL import Image
import os


def adjustImage(in_path,out_path):
    desired_height = 1080

    # Resize each image to ensure its height fits into a 16:9 frame
    img = Image.open(in_path)
    if img.mode in ("RGBA", "P"): img = img.convert("RGB")

    width, height = img.size
    new_width = int((desired_height / height) * width)
    resized_img = img.resize((new_width, desired_height))

    # Pad each resized image to the maximum width
    padded_img = Image.new("RGB", (1920, desired_height), color=(0, 0, 0))
    padded_img.paste(resized_img, ((1920 - resized_img.width) // 2, 0))
    padded_img.save(out_path)


in_path = "outputs/images"
out_path = "outputs/images_resized"
images = [f for f in os.listdir(in_path) if f.lower().endswith('.jpeg')]

for img in images:
    try:
        adjustImage(f"{in_path}/{img}",f"{out_path}/{img}")
    except:
        print(f"Failed to resize image: {img}")
        pass

