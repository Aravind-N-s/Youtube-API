/** JWT Strategy
 * @module strategy/jwt
 */

/**
 * @namespace jwtStrategy
 */

require("dotenv").config();
/**
 * Requiring passport
 * @const
 */
const passport = require("passport");
/**
 * Mongoose Model for User.
 * @const
 */
const { User } = require("../models/user");
/**
 * Requiring JWTStrategy from passport
 * @const
 */
const JWTStrategy = require("passport-jwt").Strategy;
/**
 * Function which returns the JWT
 */
const ExtractJWT = require("passport-jwt").ExtractJwt;
/**
 * @typedef {Object} options
 * @property {function} ExtractJWT - Function which returns JWT
 * @property {string} secretOrKey - JWT secret
 */
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.TOKEN_SECRET,
};

/**
 * Adding JWT Strategy
 * @name use
 * @function
 * @memberof module:strategy/jwt~jwtStrategy
 * @inner
 * @param {Object} JWTStrategyOptions - JWT Strategy Options
 */
passport.use(
  /**
   * Callback Function
   * @function
   * @inner
   * @param {object} jwtPayload - Decrypted JWT payload
   * @param {callback} done - Next function
   */
  new JWTStrategy(options, async (jwtPayload, done) => {
    await User.findById({ _id: jwtPayload._id }).then((user) => {
      return done(null, user);
    });
  })
);
