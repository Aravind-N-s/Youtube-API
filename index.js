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
/**
 * CORS is a Node.JS package for providing a Connect/Express middleware that can be used to enable CORS
 * @const
 */
const cors = require("cors");
const app = express();
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
const port = process.env.PORT;

/**
 * Passport.js as an authentication middleware.
 * @const
 */
const passport = require("passport");
const router = require("./config/routes");

/**
 * Initializing Passport
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} initialize - Midddleware
 */
app.use(passport.initialize());
require("./api/middlewares/passport-local");
require("./api/middlewares/passport-jwt");

/**
 * Routes for search api.
 * @function
 * @name use
 * @inner
 */
const asyncYoutubeSearchAPI = require("./utils/search-api");

/**
 * Calling Async Youtube Search.
 * @function
 * @name use
 * @inner
 */
setInterval(asyncYoutubeSearchAPI, 1000);

/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {string} root - Root Route
 * @param {object} router - Express Router
 */
app.use("/", router);

/**
 * Routes for hosting.
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {function} root - Root Route
 * @param {object} router - Express Router
 */

const server = app.listen(port, () => {
  consoleLogger.info(`Express Connected at port : ${port}`);
});

module.exports = server;
