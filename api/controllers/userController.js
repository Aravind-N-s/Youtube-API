/** User Controller
 * @module api/controllers
 */

/**
 * @namespace userController
 */
/**
 * Loading env variables to application
 */
require("dotenv").config;

/**
 * An implementation of JSON Web Tokens in Node.JS.
 * @const
 */
const jwt = require("jsonwebtoken");
/**
 * Mongoose Model for User.
 * @const
 */
const { User } = require("../models/user");
/**
 * Constants enumerating the HTTP status codes.
 * @const
 */
const HttpStatus = require("http-status-codes");
/**
 * Constants having logger function.
 * @const
 */
const { logger, consoleLogger } = require("../../config/logger");
/**
 * Socket values imported from index
 * @const
 */

module.exports = {
  /**
   * Controller to handle user registration
   * @name register
   * @function
   * @memberof module:api/controllers~userController
   * @inner
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   */
  async register({ body, route }, res) {
    logger.addContext("route", route.path);
    try {
      const user = await User.create({ ...body });
      logger.info(`user was registered with the email ${user.email}`);
      const responseData = user;
      return res
        .status(HttpStatus.OK)
        .json({ responseData, message: "-User Is Sucessfully Registered-" });
    } catch (err) {
      const { errors } = err;
      logger.error(`${Object.keys(errors)} errors are existed`);
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ errors, message: "-User Cannot be Registed-" });
    }
  },

  /**
   * Controller to handle user Login
   * @name login
   * @function
   * @memberof module:api/controllers~userController
   * @inner
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   */

  async login({ user, route }, res) {
    logger.addContext("route", route.path);
    const tokenData = {
      _id: user._id,
      username: user.username,
      createdAt: Number(new Date()),
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);
    logger.info(`-${user.email} was logged in.-`);
    return res
      .status(HttpStatus.OK)
      .json({ token, message: "User Details Listed." });
  },

  async logout(req, res) {
    return res.status(HttpStatus.OK).json({ message: "Please visit again." });
  },
};
