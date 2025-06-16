const express = require('express');
const { createServer } = require('http');

const setupServer = () => {
    const app = express();
    const server = createServer(app);
    const PORT = process.env.PORT || 5000;

    return { app, server, PORT };
};

module.exports = setupServer; 