const mongoose = require("mongoose");
const bcrypt= require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [3, "name must be at least 3 characters"],
    maxlength: [30, "name must not be more than 30 characters"],
  },

  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [8, "Password must be at least 8 characters"],
    
  },
});

//generating a salt and hashing passwords

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await 
})

module.exports = mongoose.model("User", UserSchema);
