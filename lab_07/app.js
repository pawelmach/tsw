//jshint node: true, esversion: 6

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const routes = require('./game');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/game', routes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.info(`server started on port ${port}`);
});

app.locals.games = new Map();