import { execSync } from "child_process";
import * as fs from "fs/promises";
import path from "path";
const __dirname = path.resolve();

(async () => {
  const config = JSON.parse(await fs.readFile("data/config.json", "utf-8"));

  const outputDirectory = path.join(__dirname, "outputs");

  //   get video duration
  // const resized_images = await fs.readdir("outputs/images_resized");
  // const video_length_in_sec =
  //   (resized_images.length - 1) * config.image_duration_in_sec;

  // download audio
  execSync(
    `wget -O "${outputDirectory}/music.mp3" https://huggingface.co/upmr/yt-musics/resolve/main/z6aONWHhTCU_12.mp3`
  );

  // // select random video
  // const videos = JSON.parse(await fs.readFile("data/musics.json", "utf-8"));
  // shuffleArray(videos);
  // shuffleArray(videos);
  // shuffleArray(videos);
  // const selectedVideo = videos[0];

  // // download audios
  // const songs = selectedVideo.songs;
  // shuffleArray(songs);
  // shuffleArray(songs);
  // shuffleArray(songs);
  // shuffleArray(songs);

  // let totalMusicDuration = 0;
  // let txt = "";
  // for (let idx = 0; idx < songs.length; idx++) {
  //   if (totalMusicDuration >= video_length_in_sec) break;
  //   const song = songs[idx];

  //   execSync(
  //     `yt-dlp "${selectedVideo.url}" --downloader ffmpeg --downloader-args "ffmpeg_i:-ss ${song.start} -to ${song.end}" --extract-audio --audio-format mp3 -o "outputs/musics/${idx}.mp3"`
  //   );
  //   txt += `file '${idx}.mp3'\n`;
  //   totalMusicDuration += song.duration;
  // }

  // // merge musics together
  // await fs.writeFile("outputs/musics/music.txt", txt);
  // execSync(
  //   `ffmpeg -f concat -safe 0 -i "${outputDirectory}/musics/music.txt" -c copy "${outputDirectory}/musics/music.mp3"`
  // );

  // create final video + add audio
  execSync(
    `ffmpeg -framerate 1/${config.image_duration_in_sec} -pattern_type glob -i "${outputDirectory}/images_resized/*.jpeg" -i "${outputDirectory}/music.mp3" -c:v libx264 -r 1 -pix_fmt yuv420p -c:a aac -strict experimental -shortest "${outputDirectory}/video.mp4"`
  );
  // execSync(
  //   `ffmpeg -framerate 1/${config.image_duration_in_sec} -pattern_type glob -i "${outputDirectory}/images_resized/*.jpeg" -c:v libx264 -r 1 -pix_fmt yuv420p "${outputDirectory}/video.mp4"`
  // );
})();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
