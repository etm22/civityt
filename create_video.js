const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

(async () => {
  const config = JSON.parse(await fs.readFile("data/config.json", "utf-8"));

  const outputDirectory = path.join(__dirname, "outputs");
  execSync(
    `ffmpeg -framerate 1/${config.image_duration_in_sec} -pattern_type glob -i "${outputDirectory}/images_resized/*.jpeg" -c:v libx264 -r 1 -pix_fmt yuv420p "${outputDirectory}/video.mp4"`
  );
})();
