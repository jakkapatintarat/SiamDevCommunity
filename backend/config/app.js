require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Database connection
const connectDB = async () => {
    try {
        const databaseUrl = 'mongodb://127.0.0.1:27017/SiamDev';
        await mongoose.connect(databaseUrl);
        console.log('Connect DB success');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

// Setup Express app
const setupApp = () => {
    const app = express();
    const server = createServer(app);
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());

    // Socket.io setup
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        socket.on('sendMessage', (data) => {
            const serverChat = {
                text: data.message,
                isChatOwner: false,
            }
            socket.broadcast.emit('serverSend', serverChat);
        });
    });

    return { app, server, PORT };
};

module.exports = {
    connectDB,
    setupApp
}; 