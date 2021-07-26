const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcryptjs = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return isEmail(value);
        },
        message: function () {
          return "invalid email";
        },
      },
    },
    password: {
      type: String,
      required: String,
      minlength: 8,
      maxlength: 128,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(user.password, salt).then((encryptedPassword) => {
      user.password = encryptedPassword;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
