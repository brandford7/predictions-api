const mongoose = require("mongoose");

const AdminSchema = new mongoose.mongo.Schema(
    {

    }, {
        timestamps:true
    }
)

module.exports= mongoose.m