const axios = require("axios");
const fs = require("fs/promises");

(async () => {
  await downloadImagesFromCivitAI(30000, 720);
})();

async function downloadImagesFromCivitAI(scrapeLimit, downloadLimit) {
  let totalImages = 0;
  let imageUrls = [];
  let url = "https://civitai.com/api/v1/images?nsfw=None";

  while (totalImages < scrapeLimit) {
    const response = await axios.get(url);
    const { items, metadata } = response.data;

    // remove all girls/woman
    let validItems = items.filter((i) => {
      if (!i.meta || !Object.keys(i.meta).includes("prompt")) return false;
      return (
        i.meta.prompt.indexOf("girl") == -1 &&
        i.meta.prompt.indexOf("female") == -1 &&
        i.meta.prompt.indexOf("asian") == -1 &&
        i.meta.prompt.indexOf("woman") == -1 &&
        i.width >= 768 &&
        i.height >= 768
      );
    });

    totalImages += validItems.length;
    url = metadata.nextPage;
    urls = validItems.map((i) => i.url);
    imageUrls.push(...urls);
    console.log(imageUrls.length)
  }

  await fs.writeFile("images.json", JSON.stringify({ urls: imageUrls }));

  // shuffleArray(imageUrls);
  // shuffleArray(imageUrls);
  // shuffleArray(imageUrls);
  // shuffleArray(imageUrls);
  // shuffleArray(imageUrls);

  // for (let idx = 0; idx < downloadLimit; idx++) {
  //   const url = imageUrls[idx];
  //   const response = await axios.get(url, { responseType: "arraybuffer" });
  //   await fs.writeFile(`outputs/images/${idx}.jpeg`, response.data);
  // }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
