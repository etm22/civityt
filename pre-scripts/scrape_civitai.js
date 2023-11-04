const axios = require("axios");
const fs = require("fs/promises");

(async () => {
  await getImageUrlsFromCivitAI(500000);
})();

async function getImageUrlsFromCivitAI(scrapeLimit) {
  let imageUrls = [];
  let url = "https://civitai.com/api/v1/images?nsfw=None";

  while (imageUrls.length < scrapeLimit) {
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

    url = metadata.nextPage;
    urls = validItems.map((i) => i.url);
    imageUrls.push(...urls);
    console.log(imageUrls.length);
  }

  await fs.writeFile("data/images.json", JSON.stringify({ urls: imageUrls }));
}
