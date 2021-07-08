/** Express router providing user related routes
 * @module user/routes
 */

/**
 * @namespace usersRouter
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const express = require("express");
const router = express.Router();

/**
 * Passport.js as an authentication middleware.
 * @const
 */
const passport = require("passport");

/**
 * Controller Methods responsible for user Registration and Login
 * @const
 */
const usercontroller = require("../api/controllers/userController");

/**
 * Route registeing user with email, password, user name
 * @name /user/register
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/users/register", usercontroller.register);
/**
 * Route logining user with email, password
 * @name /user/login
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post(
  "/users/login",
  passport.authenticate("local", { session: false }),
  usercontroller.login
);

/**
 * Route logining user with email, password
 * @name /user/login
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  usercontroller.logout
);
module.exports = router;
