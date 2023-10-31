const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

(async () => {
  let data = new FormData();
  data.append("file", fs.createReadStream("outputs/video.mp4"));
  data.append("video_title", `Stable Diffusion AI Lookbook - [1 hour, 4K FHD]`);
  data.append(
    "video_description",
    `Create free images with AI: ${process.env.AFF_LINK}
  \n
  Music Credits: Karl Casey @ White Bat Audio
  \n
  \n
  (stable diffusion,stable diffusion tutorial,stable diffusion prompt guide,stable diffusion img2img,stable diffusion models,stable diffusion lora,stable diffusion video,stable diffusion install,stable diffusion controlnet,stable diffusion ai,stable diffusion xl,stable diffusion prompts,stable diffusion anime,a1111 stable diffusion,stable diffusion scripts,stable diffusion realistic,stable diffusion extensions,stable diffusion embeddings)
  `
  );

  //  upload to youtube
  const response_3 = await axios.post(process.env.YT_UPLOADER_API, data);
})();
