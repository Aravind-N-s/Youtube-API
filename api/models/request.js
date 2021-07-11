/** User Schema
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

const requestSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = {
  Request,
};

/**
 * @typedef {Object} requestSchema
 * @property {Date} createdAt - date register of user
 */
