const fs = require("fs/promises");
const axios = require("axios");

(async () => {
  const config = JSON.parse(
    await fs.readFile("data/config.json", "utf-8")
  ).urls;
  const num_of_images_to_download =
    config.video_duration_in_sec / config.image_duration_in_sec;
  const imageUrls = JSON.parse(
    await fs.readFile("data/images.json", "utf-8")
  ).urls;

  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);

  for (let idx = 0; idx < num_of_images_to_download; idx++) {
    const url = imageUrls[idx];
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      await fs.writeFile(`outputs/images/${idx}.jpeg`, response.data);
    } catch (error) {
      console.log("Failed to download: ", url);
    }
  }
})();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// ffmpeg -framerate 1/5 -pattern_type glob -i 'outputs/images_resized/*.jpeg' -c:v libx264 -r 1 -pix_fmt yuv420p out.mp4
