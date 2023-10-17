const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

async function uploadVideoToBB() {
  let data = new FormData();
  data.append("file", fs.createReadStream("outputs/video.mp4"));

  const response = await axios.post(process.env.BB_URL, data);
  return response.data.url;
}

(async () => {
  const video_url = await uploadVideoToBB();

  const data = JSON.stringify({
    video_title: `Best AI Generated Images 2023 - (Stable Diffusion)`,
    video_description: `Create free images with AI: ${process.env.AFF_LINK}
\n
Music Credits: Karl Casey @ White Bat Audio
\n
\n
\n
(stable diffusion,stable diffusion tutorial,stable diffusion prompt guide,stable diffusion img2img,stable diffusion models,stable diffusion lora,stable diffusion video,stable diffusion install,stable diffusion controlnet,stable diffusion ai,stable diffusion xl,stable diffusion prompts,stable diffusion anime,a1111 stable diffusion,stable diffusion scripts,stable diffusion realistic,stable diffusion extensions,stable diffusion embeddings)
`,
    video_url,
  });

  //  upload to youtube
  const response_3 = await axios.post(process.env.YT_UPLOADER_API, data);
})();
