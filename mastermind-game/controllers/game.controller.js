//jshint node: true, esversion: 6
'use strict';

const ocena = require('./move.controller');

const newgame = (size, colors, steps) => {

    let game = {
        size: size,
        colors: colors,
    };

    for(let i in size) {
        game.code.push((Math.random() * 1000)%colors);
    }

    game.steps = steps | -1;

    game.ocena = ocena(game.code);

    return game;
};

module.exports = newgame;