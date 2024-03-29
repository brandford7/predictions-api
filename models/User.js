import mongoose from "mongoose";
import config from "../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

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
    index: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter a valid email address"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  customer: {
    customerCode: {
      type: String,
      unique: true,
    },
    customerId: { type: Number, unique: true },

    // Add more customer-specific fields as needed
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username, role: this.role },
    config.jwtSecret,
    {
      expiresIn: config.jwtLifetime,
    }
  );
};
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

export default User;
