//jshint node: true, esversion: 6
'use strict';

const ocena = require('./move.controller');

const newgame = (size, colors, steps) => {

    if(typeof(size) !== 'number'){
        return -1;
    }

    if(typeof(colors) !== 'number') {
        return -2;
    }

    let game = {
        size: size,
        colors: colors,
    }

    for(let i = 0; i < size; i++) {
        game.code.push((Math.random() * 1000)%colors);
    }

    if(typeof(steps) === 'undefined'){
        game.steps = -1;
    } else {
        game.steps = steps;
    }

    game.ocena = ocena(game.code);

    return game;
};

module.exports = newgame;