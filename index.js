/** Express Server
 * @module server/app
 */

/**
 * @namespace appServer
 */
/**
 * Loading env variables to application
 */
require("dotenv").config();
/**
 * Importing mongoose connection
 */
const { mongoose } = require("./config/database");
/**
 * Express is a Node.js web application framework
 * @const
 */
const express = require("express");
const { consoleLogger } = require("./config/logger");
const HttpStatus = require("http-status-codes");
/**
 * CORS is a Node.JS package for providing a Connect/Express middleware that can be used to enable CORS
 * @const
 */
const cors = require("cors");
const app = express();
const path = require("path");
/**
 * Cross Origin Resource Sharing (CORS) allows us to use Web applications within browsers when domains aren't the same
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} cors - Enable cors in our application
 */
app.use(cors());
/**
 * Sends output in json format
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} express.json - Enable express to send json valie in our application
 */
app.use(express.json());
const http = require("http").createServer(app);

const port = process.env.PORT;

app.listen(port, () => {
  consoleLogger.info(`Express Connected at port : ${port}`);
});
