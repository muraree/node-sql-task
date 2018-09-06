const express = require('express');
const app = express();
const db = require('./db');

const controller = require('./controller');
app.use('/api', controller);

module.exports = app;