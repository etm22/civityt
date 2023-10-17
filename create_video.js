const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

(async () => {
  const config = JSON.parse(await fs.readFile("data/config.json", "utf-8"));

  const outputDirectory = path.join(__dirname, "outputs");

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
  let txt = "";
  for (let idx = 0; idx < songs.length; idx++) {
    if (totalMusicDuration >= video_length_in_sec) break;
    const song = songs[idx];
    totalMusicDuration += song.duration;
    txt += `file '${idx}.mp3'\n`;

    execSync(
      `yt-dlp "${selectedMusic.url}" --downloader ffmpeg --downloader-args "ffmpeg_i:-ss ${song.start} -to ${song.end}" --extract-audio --audio-format mp3 -o "outputs/musics/${idx}.mp3"`
    );
  }

  // merge musics together
  await fs.writeFile("outputs/musics/music.txt", txt);
  execSync(
    `ffmpeg -f concat -safe 0 -i "${outputDirectory}/musics/music.txt" -c copy "${outputDirectory}/musics/music.mp3"`
  );

  // create final video + add audio
  execSync(
    `ffmpeg -framerate 1/${config.image_duration_in_sec} -pattern_type glob -i "${outputDirectory}/images_resized/*.jpeg" -i "${outputDirectory}/musics/music.mp3" -c:v libx264 -r 1 -pix_fmt yuv420p -c:a aac -strict experimental -shortest "${outputDirectory}/video.mp4"`
  );
})();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
