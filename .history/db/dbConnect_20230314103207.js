const mongoose = require

const connectDB = (uri) => {
    return mongoose.connect(uri)
}
 
module.exports=connectDB