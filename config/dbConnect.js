import mongoose from 'mongoose';
import {config} from './config.js'
const connectDB = (mongoURI) => {
    mongoose
        .connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err);
        });
}

export default connectDB;