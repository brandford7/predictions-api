const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:{type:}
    
})
module.exports= mongoose.model('User', UserSchema)