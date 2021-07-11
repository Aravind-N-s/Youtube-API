const axios = require("axios");
(async () => {
  try {
    const data = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          keys: process.env.YOUTUBE_KEY,
          type: "video",
          // order= Date.now(),
          // publishedAfter= Date.now(),
          q: "cricket",
        },
      }
    );
    console.log({ data });
  } catch (err) {
    console.log({ err });
  }
})();
