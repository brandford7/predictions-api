const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:{type: String,, unique:tr}
    
})
module.exports= mongoose.model('User', UserSchema)