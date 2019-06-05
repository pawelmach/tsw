
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
    res.json({ info: 'server works' });
});

app.listen(port, '0.0.0.0', function () {
    console.log(`Server started on port: ${port}`);
});

exports = module.exports = app;
