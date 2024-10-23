import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose"

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
    maxPoolSize: 10
};

// MongoDB connection URI (using environment variable)
const MONGODB_URI = process.env.MONGODB_URI ||5000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI, options);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        // Handle application termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;