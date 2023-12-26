const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

async function refreshTiktokToken() {
  const data = JSON.stringify({
    key: process.env.TK_REFRESH_TOKEN,
    platform: "tiktok_pc_share",
  });

  const config = {
    method: "post",
    url: "https://feed-api-sg.capcut.com/lv/v1/oauth/refresh_token",
    headers: {
      "App-Sdk-Version": "2.8.0",
      "Content-Type": "application/json",
      appvr: "2.8.0",
      "device-time": "1700895931",
      lan: "en",
      loc: "US",
      pf: "4",
      sign: "a9e300ffec07d8357bdaee2c3dbfbfa6",
      "sign-ver": "1",
      tdid: "7216623130209994242",
      "User-Agent":
        "Cronet/TTNetVersion:3024dcd7 2023-10-18 QuicVersion:4bf243e0 2023-04-17",
    },
    data,
  };
  const response = await axios(config);
  return response.data.data.access_token;
}

async function getUploadURL(access_token, title, videoFile) {
  const fileSize = fs.statSync(videoFile).size;

  const data = `{\r\n    "post_info": {\r\n        "disable_comment": false,\r\n        "disable_duet": false,\r\n        "disable_stitch": false,\r\n        "privacy_level": "PUBLIC_TO_EVERYONE",\r\n        "title": "${title}",\r\n        "video_cover_timestamp_ms": 1\r\n    },\r\n    "source_info": {\r\n        "chunk_size": ${fileSize},\r\n        "source": "FILE_UPLOAD",\r\n        "total_chunk_count": 1,\r\n        "video_size": ${fileSize}\r\n    }\r\n}`;

  const config = {
    method: "post",
    url: "https://open-platform.tiktokapis.com/v2/post/publish/video/init",
    headers: {
      Connection: "keep-alive",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "Cronet/TTNetVersion:3024dcd7 2023-10-18 QuicVersion:4bf243e0 2023-04-17",
    },
    data,
  };

  const response = await axios(config);
  return response.data.data.upload_url;
}

async function uploadVideo(upload_url, videoFile) {
  const data = fs.createReadStream(videoFile);
  const fileSize = fs.statSync(videoFile).size;

  const config = {
    method: "put",
    url: upload_url,
    headers: {
      "User-Agent":
        "Cronet/TTNetVersion:3024dcd7 2023-10-18 QuicVersion:4bf243e0 2023-04-17",
      MIME_TYPE: "video/mp4",
      Host: "open-upload.us.tiktokapis.com",
      "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}`,
      "Content-Type": "video/mp4",
    },
    data,
  };
  const response = await axios(config);
}

async function getTopHashtages(count) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?limit=50&period=7&sort_by=popular",
    headers: {
      cookie: process.env.TK_COOKIES,
      lang: "en",
      referer:
        "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en",
      timestamp: "1703584232",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "user-sign": "38f2c48192865e2b",
      "web-id": "7316837328067610113",
    },
  };

  const response = await axios(config);
  const hashtags = response.data.data.list.map(
    (item) => `#${item.hashtag_name}`
  );
  shuffle(hashtags);
  return hashtags.slice(0, count);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

(async () => {
  const videoFile = "outputs/shorts_boosted.mp4";

  let hashtags = await getTopHashtages(7);
  hashtags = hashtags.join(" ");

  const access_token = await refreshTiktokToken();
  const upload_url = await getUploadURL(
    access_token,
    `AI Generated Images ${hashtags}`,
    videoFile
  );

  await uploadVideo(upload_url, videoFile);
})();
