/* jshint strict: global, esversion: 6, devel: true */
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

console.log(ocena([2,4,6,8,5])([5,4,4,5,6]));

/*
24685
54456
*/