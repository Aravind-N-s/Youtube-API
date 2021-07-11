/** Local Strategy
 * @module strategy/local
 */

/**
 * @namespace localStrategy
 */

/**
 * Requiring passport
 * @const
 */
const passport = require("passport");
/**
 * Requiring LocalStrategy from passport
 * @const
 */
const LocalStrategy = require("passport-local").Strategy;
/**
 * Mongoose Model for User.
 * @const
 */
const { User } = require("../models/User");
/**
 * A library to hash tthe password.
 * @const
 */
const bcryptjs = require("bcryptjs");
/**
 * @typedef {Object} options
 * @property {string} username - field/json property name in request body
 * @property {string} password - field/json property name in request body
 */
const options = {
  usernameField: process.env.USERNAME_FIELD,
  passwordField: process.env.PASSWORD_FIELD,
};
/**
 * Adding Local Strategy
 * @name use
 * @function
 * @memberof module:strategy/local~localStrategy
 * @inner
 * @param {Object} LocalStrategyOptions - Local Strategy Options
 */
passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    // Fetch User By Email
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: "USER_NOT_FOUND" });
    const validate = await bcryptjs.compare(password, user.password);
    if (!validate) return done(null, false, { message: "WOOP" });
    return done(null, user, {
      message: { result: "Data" },
    });
  }),
);
