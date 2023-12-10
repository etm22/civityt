const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

(async () => {
  let data = new FormData();
  data.append("file", fs.createReadStream("outputs/shorts_boosted.mp4"));
  data.append(
    "video_title",
    `speedrunning yt shorts (AI Images) #${Date.now().toString().slice(-3)}`
  );
  data.append(
    "video_description",
    `ai artwork generator, ai art generator, ai art generator free, ai artificial intelligence, ai art generator anime, ai art trend, ai art generator app, ai artificial intelligence movie, ai art generator discord, ai art controversy, ai art generator free online, ai artist generator, ai art generator website, ai art anime generator, ai art generator tiktok, ai art generator free from text, ai artist app, ai art app free, ai art generator fantasy, ai art generator free app, ai art generator android, ai art trend instagram, ai art app ios, ai art tutorial, ai art generator free website, ai artwork free, ai art generator free anime, ai art generator free download, ai art generator free apk, ai art trend app, ai artificial intelligence robot, ai artificial intelligence alien, ai art trend tiktok, ai art collection, ai art app tiktok, ai art applications, ai art generator tutorial, ai art generator review, ai art generator music, ai art generator free best, ai art app android, ai art app trend, ai artificial intelligence joe, ai artificial intelligence soundtrack, ai artificial intelligence new york, ai art generator free android, ai art app review, ai art generator song, ai art generator human evolution, ai artificial intelligence nostalgia critic, ai artificial intelligence eating, ai artificial intelligence future, ai artificial intelligence vhs, ai artificial intelligence analysis, ai art trend gacha, ai art trend tutorial, ai art trend free, ai art tutorial tiktok, ai artist little mermaid, ai art beauties, ai art lookbook, ai art generator midjourney, ai art beauties anime, ai art beauties european, ai art beauties sticking out the tongue, ai art beauties office, ai art beauties flight attendant, ai art beauties silver hair girl, ai artificial intelligence moon, ai artificial intelligence nanny, ai artificial intelligence reaction, ai artificial intelligence full movie english subtitles, ai art generator free iphone, ai art generator free pc, ai art generator free sinhala, ai art generator free for mobile, ai art generator free malayalam, ai art generator free mobile, ai art generator free in hindi, ai art trend compilation, ai art trend gacha club, ai art trend website, ai art trend comp, ai art trend meitu, ai art trend anime, ai art trend song, ai art trend rant, ai art controversy explained, ai art scandal, ai generated art controversy, sam does art ai controversy, ai artificial intelligence movie aliens, ai artificial intelligence movie malayalam explanation, ai art tutorial stable diffusion, ai art tutorial for beginners, ai art tutorial anime, ai art tutorial free, ai art tutorial bangla, ai art tutorial meitu, ai art tutorial discord, ai art tutorial tamil, ai art tutorial in hindi, ai art tutorial sinhala, ai art tutorial android, ai art tutorial mobile, ai artwork wins competition, ai artwork video, ai artwork app, ai artwork songs, ai artwork tutorial, ai artwork generator free, ai artwork wins, ai artwork (artificial intelligence), ai artwork photoshop, ai artwork anime, artwork mid journey, ai artwork discord, ai artwork discord bot, ai art anime tutorial, ai art anime be like, ai art anime generator free, ai art anime app, ai art anime free, ai art anime style, ai art anime meme, ai art anime tiktok, ai art anime song, ai art anime expo, ai art anime filter, ai art anime man, ai art lookbook bikini, ai art lookbook girl, 4k ai art lookbook, ai gay art lookbook, ai art channel lookbook, ai art office lookbook, runway by ai art lookbook, ai art beauty lookbook, 4k ai art lookbook amazing, ai art picture lookbook, ai art spring school uniform lookbook, ai art apps for iphone, ai art app anime, ai art apple, ai art app gacha, ai art app name, ai art app for pc, ai art app tamil, ai art apps for pc, ai artists be like, ai artists aren't artists, ai artist wins competition, ai artist tv, ai artist family guy, ai artist rapper, ai artist robot, ai artist vs artist, ai artist gets called out, ai artist website, ai artist covers, ai artist voice generator, ai artist music, ai artists singing`
  );

  //  upload to youtube
  const response_3 = await axios.post(process.env.YT_UPLOADER_API, data);
})();
