const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:
    
})
module.exports= mongoose.model('User', UserSchema)