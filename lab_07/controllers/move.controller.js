//jshint node: true, esversion: 6
'use strict';

const ocena = (kod) => {

    return (ruch) => {
        let white = 0, black = 0;

        ruch.map( (val, i) => {
            if(val == kod[i]){
                black++;
                ruch.splice(i, i);
                kod.splice(i, i);
            } 
        });

        ruch.map( (val) => {
            let temp = kod.indexOf(val);
            if(temp !== -1){
                white++;
                kod.splice(temp, temp);
            }
        });

        return [{'black': black}, {'white': white}];
    };
};

module.exports = ocena;