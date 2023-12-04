from PIL import Image,ImageDraw,ImageFont
import os


def adjustImage(in_path,out_path,add_text,desired_height, desired_width):

    # Resize each image to ensure its height fits into a 16:9 frame
    img = Image.open(in_path)
    if img.mode in ("RGBA", "P"): img = img.convert("RGB")

    width, height = img.size
    new_width = int((desired_height / height) * width)
    resized_img = img.resize((new_width, desired_height))

    # Pad each resized image to the maximum width
    padded_img = Image.new("RGB", (desired_width, desired_height), color=(0, 0, 0))
    padded_img.paste(resized_img, ((desired_width - resized_img.width) // 2, 0))

    if add_text:
        # Add text at the bottom
        text_to_add="Generate images using AI: www.aimages.xyz"
        draw = ImageDraw.Draw(padded_img)
        text_color = (255, 255, 255)  # White text color
        text_font = ImageFont.truetype("arial.ttf", 40)  # You can specify the font and size
        text_width, text_height = draw.textsize(text_to_add, font=text_font)
        text_position = ((desired_width - text_width) // 2, 10)

        background_position = (text_position[0] - 5, text_position[1] - 5)
        background_size = (text_width + 10, text_height + 10)
        draw.rectangle([background_position, (background_position[0] + background_size[0], background_position[1] + background_size[1])], fill=(0, 0, 0))
        
        draw.text(text_position, text_to_add, fill=text_color, font=text_font)

    padded_img.save(out_path)

in_path = "outputs/images"
out_path = "outputs/images_resized"
images = [f for f in os.listdir(in_path) if f.lower().endswith('.jpeg')]

for idx in range(len(images)):
    img = images[idx]
    try:
        if(idx % 10 == 0):
            adjustImage(f"{in_path}/{img}",f"{out_path}/{img}",True,1080,1920)
        else:
            adjustImage(f"{in_path}/{img}",f"{out_path}/{img}",False, 1080,1920)
    except:
        print(f"Failed to resize image: {img}")
        pass

