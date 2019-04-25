//jshint node: true, esversion: 6
'use strict';

const check = (code) => {
    return (move) => {
        let white = 0, black = 0;

        let moveTemp = move.map(x => x = {value: x, visited: false});
        let codeTemp = code.map(x => x = {value: x, visited: false});
        
        moveTemp.map((move, index) => {
            if(move.value === codeTemp[index].value){
                codeTemp[index].visited = true;
                move.visited = true;
                black++;
            }
        });

        moveTemp.filter(move => move.visited !== true)
            .map(move => {
                let index = codeTemp
                    .findIndex(code => 
                            code.visited !== true &&
                            code.value === move.value
                        );
                if(index !== -1){
                    codeTemp[index].visited = true;
                    white++;
                }
            });

        return {black: black, white: white};
    };
};

module.exports = check;