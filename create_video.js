const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

(async () => {
  const config = JSON.parse(await fs.readFile("data/config.json", "utf-8"));

  const outputDirectory = path.join(__dirname, "outputs");
  //   execSync(
  //     `ffmpeg -framerate 1/${config.image_duration_in_sec} -pattern_type glob -i "${outputDirectory}/images_resized/*.jpeg" -c:v libx264 -r 1 -pix_fmt yuv420p "${outputDirectory}/video.mp4"`
  //   );

  //   get video duration
  const resized_images = await fs.readdir("outputs/images_resized");
  const video_length_in_sec =
    (resized_images.length - 1) * config.image_duration_in_sec;

  // generate audios
  const musics = JSON.parse(await fs.readFile("data/musics.json", "utf-8"));
  shuffleArray(musics);
  const selectedMusic = musics[0];

  // download audios
  const songs = selectedMusic.songs;
  shuffleArray(songs);
  shuffleArray(songs);
  shuffleArray(songs);
  shuffleArray(songs);

  let totalMusicDuration = 0;
  for (let idx = 0; idx < songs.length; idx++) {
    if (totalMusicDuration >= video_length_in_sec) break;
    const song = songs[idx];
    totalMusicDuration += song.duration;

    execSync(
      `yt-dlp "${selectedMusic.url}" --downloader ffmpeg --downloader-args "ffmpeg_i:-ss ${song.start} -to ${song.end}" --extract-audio --audio-format mp3 -o "outputs/musics/${idx}.mp3"`
    );
  }
})();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
