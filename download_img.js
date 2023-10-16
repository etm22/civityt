const fs = require("fs/promises");

(async () => {
  const limit = 720;
  const imageUrls = JSON.parse(await fs.readFile("imags.json", "utf-8"));

  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);
  shuffleArray(imageUrls);

  for (let idx = 0; idx < limit; idx++) {
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
