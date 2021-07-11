/** User Schema
 * @module user/schema
 */

/**
 * @namespace userSchema
 */

/**
 * Mongoose driver for MongoDb
 * @const
 */
const mongoose = require("mongoose");
/**
 * A library to validate the password and username.
 * @const
 */
const validator = require("validator");
/**
 * A library to hash tthe password.
 * @const
 */
const bcryptjs = require("bcryptjs");
/**
 * Plugin which adds pre-save validation for unique fields within a Mongoose schema.
 * @const
 */
const uniqueValidator = require("mongoose-unique-validator");
/**
 * Mongoose Schema
 * @const
 */
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 5,
    },
    lastName: {
      type: String,
    },
    name: {
      type: String,
      default: function () {
        return `${this.firstName || ""} ${this.lastName || ""}`.trim();
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: function () {
          return "Invalid Email Format.";
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "User" },
);

/**
 * Pre Middleware hook for save
 * @name pre
 * @function
 * @memberof module:user/schema~userSchema
 * @inner
 * @param {callback} middleware - Middleware with next as a param
 */
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then((salt) => {
      /**
       * Function to hash the password.
       * @function
       * @inner
       * @param {string} password - New Password
       * @param {int} salt - Bcrypt Salt value
       * @param {Promise} - Returns a hash for the password
       */
      bcryptjs.hash(user.password, salt).then((encrpytedPassword) => {
        user.password = encrpytedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * Plugin to validate uniqueness of email and phone
 */
userSchema.plugin(uniqueValidator, { message: `Already Exists` });

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};

/**
 * @typedef {Object} UserSchema
 * @property {String} firstName - First Name of User
 * @property {String} lastName - Last Name of User
 * @property {String} name - Full Name of User
 * @property {String} email - Email of User
 * @property {String} phone - Phone No. of User
 * @property {String} username - unique username No. of User
 * @property {String} email - unique email of User
 * @property {String} password - hashed password of User
 * @property {Date} createdAt - date register of user
 */
