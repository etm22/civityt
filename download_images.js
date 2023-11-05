import * as fs from "fs/promises";
import axios from "axios";
import pLimit from "p-limit";
const limit = pLimit(50);

(async () => {
  const config = JSON.parse(await fs.readFile("data/config.json", "utf-8"));
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

  imageUrls
    .slice(0, num_of_images_to_download)
    .map((url) => limit(() => downloadAndSaveImage(url)));
})();

async function downloadAndSaveImage(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 5000,
    });
    await fs.writeFile(`outputs/images/${Date.now()}.jpeg`, response.data);
  } catch (error) {
    console.log("Failed to download: ", url);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
