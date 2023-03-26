const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    required:[true, 'Ple']},
  email: {
      type: String,
      required:[true,'Please enter a valid email address'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});
module.exports= mongoose.model('User', UserSchema)