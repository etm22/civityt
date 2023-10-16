const axios = require("axios");
const fs = require("fs/promises");

(async () => {
  await downloadImagesFromCivitAI(50);
})();

async function downloadImagesFromCivitAI(noOfImages) {
  let totalImages = 0;
  let imageUrls = [];
  let url = "https://civitai.com/api/v1/images?nsfw=None";

  while (totalImages < noOfImages) {
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
  }

  for (let idx = 0; idx < imageUrls.length; idx++) {
    const url = imageUrls[idx];
    // const extension = url.split(".")[3];
    const response = await axios.get(url, { responseType: "arraybuffer" });
    await fs.writeFile(`outputs/images/${idx}.jpeg`, response.data);
  }
}
