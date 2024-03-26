// middlewares.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = function(app) {
    app.use(morgan('dev')); // HTTP request logger
    app.use(express.json()); // Parse JSON bodies
    app.use(cors());
};
