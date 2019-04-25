//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const uuid = require('uuid/v1');
const router = express.Router();
const checker = require('./checker');

router.post('/new', (req, res) => {
    let options = req.body;
    if(options.size && options.colors){
        let id = uuid();
        let code = Array.from(Array(options.size), () => Math.floor(Math.random() * (options.colors)));
        let game = {
            size: options.size,
            colors: options.colors,
            moves: options.moves > 0 ? options.moves : -1,
            code: code,
            check: checker(code),
            solved: false
        };
        req.app.locals.games.set(id, game);
        console.log(req.app.locals.games);
        res.json({game: id});
    } else {
        res.json({error: 'no params [size, colors]'});
    }
});

router.post('/move', (req, res) => {
    console.log(req.body.move);
    if(req.body.game && Array.isArray(req.body.move)){
        let id = req.body.game;
        let move = Array.from(req.body.move);
        let game = req.app.locals.games.get(id);

        let moveRes = {
            game: req.body.game,
            black: -1,
            white: -1
        };

        if(game.moves !== 0){
            let result = game.check(move);
            if(result.black === game.size){
                game.solved = true;
            }
            moveRes.black = result.black;
            moveRes.white = result.white;
        }
        console.log(moveRes);
        res.json(moveRes);
    } else {
        res.json({error: 'You didnt send game uuid'});
    }
});

router.post('/status', (req, res) => {
    if(req.body.game){
        let game = req.app.locals.games.get(req.body.game);
        let moveRes = {
            game: req.body.game,
            solved: game.solved
        };
        res.json(moveRes);
    }
});

module.exports = router;