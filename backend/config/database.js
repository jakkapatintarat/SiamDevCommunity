const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const databaseUrl = 'mongodb://127.0.0.1:27017/SiamDev';
        await mongoose.connect(databaseUrl);
        console.log('Connect DB success');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; 