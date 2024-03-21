// middlewares.js
const express = require('express');
const morgan = require('morgan');

module.exports = function(app) {
    app.use(morgan('dev')); // HTTP request logger
    app.use(express.json()); // Parse JSON bodies
};
