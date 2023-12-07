import * as fs from "fs/promises";
import tf from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import axios from "axios";

(async () => {
  const imageUrls = JSON.parse(
    await fs.readFile("data/images.json", "utf-8")
  ).urls;

  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);

  let idx = 0;
  const selectedImages = [];

  while (selectedImages.length < 10) {
    try {
      const hasNSFW = await detectNSFW(imageUrls[idx]);
      if (!hasNSFW) selectedImages.push(imageUrls[idx]);
    } catch (error) {
      console.log("Failed to detect nsfw: ", imageUrls[idx]);
    }
  }

  // background video
  console.log(selectedImages);
  await fs.writeFile(
    "outputs/remotion.json",
    JSON.stringify({
      urls: selectedImages,
      bg_video: `https://huggingface.co/upmr/temp/resolve/main/m${getRandomInt(
        1,
        7
      )}.mp4`,
    })
  );
})();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Function to generate a random number between min and max (both inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function detectNSFW(image_url) {
  const pic = await axios.get(image_url, {
    responseType: "arraybuffer",
  });

  const model = await nsfw.load();
  const image = await tf.node.decodeImage(pic.data, 3);
  const predictions = await model.classify(image);

  const pornPred = predictions.filter((p) => p.className == "Porn")[0];
  return pornPred.probability > 0.05;
}
