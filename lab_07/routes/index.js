//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const router = express.Router();

const gameRoutes = require('./game.route');

router.use('', gameRoutes);

module.exports = router;