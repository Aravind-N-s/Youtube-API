/** request Controller
 * @module api/controllers
 */

/**
 * @namespace requestController
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
 * Mongoose Model for request.
 * @const
 */
const { Request } = require("../models/Request");
/**
 * Constants enumerating the HTTP status codes.
 * @const
 */
const HttpStatus = require("http-status-codes");
/**
 * Constants having logger function.
 * @const
 */
const { logger } = require("../../config/logger");
/**
 * Socket values imported from index
 * @const
 */

module.exports = {
  /**
   * Controller to handle request search
   * @name search
   * @function
   * @memberof module:api/controllers~requestController
   * @inner
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   */
  async searchRequest({ route, query }, res) {
    logger.addContext("route", route.path);
    const searchRequest = query.search;
    const limitRequest = Number(query.paginate) || 5;

    try {
      const requestInfo = await Request.find({
        $or: [
          {
            title: { $regex: searchRequest, $options: "$i" },
            description: { $regex: searchRequest, $options: "$i" },
          },
        ],
      })
        .limit(limitRequest)
        .sort({ publishTime: -1 });

      if (!requestInfo.length) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ requestInfo, message: `${searchRequest} not found.` });
      }

      logger.info(`requestInfo search ${requestInfo._id}`);

      requestInfo.forEach(async (ele) => {
        await Request.updateMany(
          { _id: ele._id },
          { $set: { count: ele.count + 1 } },
        );
      });

      return res
        .status(HttpStatus.OK)
        .json({ data: requestInfo, message: "-Data Response -" });
    } catch (err) {
      logger.error(`${err} errors are existed`);
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({ err, message: err });
    }
  },

  /**
   * Controller to handle request dashboard
   * @name dashboard
   * @function
   * @memberof module:api/controllers~requestController
   * @inner
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   */

  async dashboard({ route, query }, res) {
    logger.addContext("route", route.path);
    const limitRequest = Number(query.paginate) || 5;
    const sortOption = query.sort === "asc" ? 1 : -1;

    try {
      const requestInfo = await Request.find({})
        .limit(limitRequest)
        .sort({ count: sortOption || -1 });

      if (!requestInfo.length) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: "Dashboard not generated." });
      }

      logger.info(`requestInfo search ${requestInfo._id}`);

      return res.status(HttpStatus.OK).json({
        data: requestInfo,
        message: "-Data Response -",
      });
    } catch (err) {
      const { errors } = err;
      logger.error(`${Object.keys(errors)} errors are existed`);

      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ errors, message: errors });
    }
  },
};
