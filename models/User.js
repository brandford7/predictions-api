import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false, // Set to true when a user subscribes
  },
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

export default User;
