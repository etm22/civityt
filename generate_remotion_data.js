import * as fs from "fs/promises";

(async () => {
  const imageUrls = JSON.parse(
    await fs.readFile("data/images.json", "utf-8")
  ).urls;

  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);

  const selectedImages = imageUrls.slice(0, 10);

  // background video

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
