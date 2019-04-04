//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const uuid = require('uuid/v1');

const router = express.Router();

router.post('/new', (req, res) => {
    

    let newGameRes = {
        game: uuid()
    };
    res.json(newGameRes);
});

router.post('/move', (req, res) => {

    let moveRes = {
        game: req.body.game,
        black: 2,
        white: 2
    }
    res.json(moveRes);
});

router.post('/status', (req, res) => {
    let moveRes = {
        game: req.body.game,
        solved: false
    };
    res.json(moveRes);
});

module.exports = router;