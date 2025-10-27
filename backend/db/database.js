const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_management';

async function connectDB() {
  const maxRetries = 5;
  let attempts = 0;

    while (attempts < maxRetries) {
        try {
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
            break; // Exit loop on successful connection
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            attempts++;
            console.log(`Retrying connection (${attempts}/${maxRetries})...`);
            await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds before retrying
        }
    }

    // MongoDB connection event handlers
    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
    });

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
    });

}

module.exports = connectDB;