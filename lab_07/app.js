//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const logger = require('morgan');

const routes = require('./routes');

let games = new Map();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/game', routes);

app.listen(port, () => {
    console.info(`server started on port ${port}`);
});
