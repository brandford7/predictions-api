import mongoose from "mongoose";
import config from "../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please enter a valid username"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password length should be at least 8 characters"],
  },
  email: {
    type: String,
    trim: true,

    required: [true, "Please enter a valid email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false, // Set to true when a user subscribes
  },
  // Add more fields as needed
});


UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.username }, config.jwtSecret, {
    expiresIn: config.jwtLifetime,
  });
};
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);


export default User;
