require("dotenv").config();
const order = Date.now();
const axios = require("axios");
const { Request } = require("../api/models/Request");

const { logger } = require("../config/logger");

const query = process.env.QUERY || "cricket";
const fetchYoutubeSearchSpoilers = async () => {
  try {
    logger.info(order);
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          maxResults: 10,
          key: process.env.YOUTUBE_KEY,
          part: "snippet",
          order: "date",
          type: "video",
          publishedAfter: "2020-10-01T00:00:00Z",
          q: query,
        },
      }
    );
    data.items.forEach(async (items) => {
      const payload = {
        etag: items.etag,
        title: items.snippet.title,
        description: items.snippet.description,
        publishTime: items.snippet.publishTime,
        defaultThumbnail: items.snippet.thumbnails.default.url,
      };
      const add = await Request.findOne({ etag: items.etag });
      if (!add) await Request.create({ ...payload });
    });
  } catch (err) {
    logger.error(err);
  }
};

module.exports = fetchYoutubeSearchSpoilers;
