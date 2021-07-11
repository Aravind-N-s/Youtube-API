/** Request Schema
 * @module request/schema
 */

/**
 * @namespace requestSchema
 */

/**
 * Mongoose driver for MongoDb
 * @const
 */
const mongoose = require("mongoose");
/**
 * Mongoose Schema
 * @const
 */
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    etag: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    publishTime: {
      type: Date,
    },
    defaultThumbnail: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "Request" },
);

const Request = mongoose.model("Request", requestSchema);

module.exports = {
  Request,
};

/**
 * @typedef {Object} requestSchema
 * @property {String} etag - Unique id of videa
 * @property {String} title - String to search video
 * @property {String} description - String to search description
 * @property {Date} publishTime - Date of video
 * @property {String} defaultThumbnail - url of the thumbnail
 * @property {Number} count - number of times the video is searched for dashboard
 * @property {Date} createdAt - date added via async
 */
