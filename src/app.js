const express = require('express');
const setupSwagger = require('./swagger');

const app = express();
app.use(express.json());

// Swagger route
setupSwagger(app);

// API routes

module.exports = app;
