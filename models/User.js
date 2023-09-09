import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  },
  isSubscribed: {
    type: Boolean,
    default: false, // Set to true when a user subscribes
  },
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function () {
  const salt = await bcrpt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, config.jwtSecret, {
    expiresIn: config.jwtLifetime,
  });
};
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default User;
