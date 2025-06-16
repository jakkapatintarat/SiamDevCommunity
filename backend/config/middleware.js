const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const setupMiddleware = (app) => {
    // Middleware
    app.use(bodyParser.json());
    app.use(cors());
};

module.exports = setupMiddleware; 