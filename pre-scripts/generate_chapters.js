const { default: axios } = require("axios");
const fs = require("fs/promises");
require("dotenv").config();

function parseChapters(description) {
  // Extract timestamps (either 00:00:00, 0:00:00, 00:00 or 0:00)
  const lines = description.split("\n");
  const regex = /(\d{0,2}:?\d{1,2}:\d{2})/g;
  const chapters = [];

  for (const line of lines) {
    // Match the regex and check if the line contains a matched regex
    const matches = line.match(regex);
    if (matches) {
      const ts = matches[0];

      chapters.push({
        timestampInSeconds: timeStringToSeconds(ts),
      });
    }
  }

  // add start/end for each ts
  // ignore last one because we don't know ending duration
  let final_chapters = [];
  for (let idx = 0; idx < chapters.length - 1; idx++) {
    const ts = chapters[idx];
    final_chapters.push({
      start: ts.timestampInSeconds,
      end: chapters[idx + 1].timestampInSeconds,
    });
  }
  // add duration
  final_chapters = final_chapters.map((c) => {
    return {
      ...c,
      duration: c.end - c.start,
    };
  });
  return final_chapters;
}

async function downloadYoutubeVideoChapters(videoId) {
  // check if video already used
  const existing_music = JSON.parse(
    await fs.readFile("data/musics.json", "utf-8")
  );
  const exists =
    existing_music.filter(
      (e) => e.url == `https://www.youtube.com/watch?v=${videoId}`
    ).length > 0;
  if (exists) throw new Error("Video already used");

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YT_API_KEY}`
  );
  const description = response.data.items[0].snippet.description;
  const chaptersTimestamps = parseChapters(description);
  const result = {
    url: `https://www.youtube.com/watch?v=${videoId}`,
    songs: chaptersTimestamps,
  };

  // update json file
  existing_music.push(result);
  await fs.writeFile("data/musics.json", JSON.stringify(existing_music));
}

function timeStringToSeconds(timeString) {
  const timeArray = timeString.split(":");
  let seconds = 0;

  if (timeArray.length === 3) {
    // Format: hh:mm:ss
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    seconds = parseInt(timeArray[2], 10);

    seconds += hours * 3600;
    seconds += minutes * 60;
  } else if (timeArray.length === 2) {
    // Format: mm:ss
    const minutes = parseInt(timeArray[0], 10);
    seconds = parseInt(timeArray[1], 10);

    seconds += minutes * 60;
  }

  return seconds;
}

(async () => {
  await downloadYoutubeVideoChapters("pfNwL0IHrU0");
  // yt-dlp "https://www.youtube.com/watch?v=J-tKWv7he1c" --downloader ffmpeg --downloader-args "ffmpeg_i:-ss 424 -to 650" --extract-audio --audio-format mp3
})();
