/* jshint esversion: 6, browser: true, devel: true */
/* globals axios */
/* globals colorMap */

document.addEventListener('DOMContentLoaded', () => {
    
    let newGameBtn = document.getElementById('newGameBtn');
    let checkBtn = document.getElementById('checkBtn');
    let game = document.getElementById('game');
    let newGameForm = document.getElementById('newGameForm');
    let startGame = document.getElementById('startGame');
    
    if(localStorage.getItem('uuid')){
        //rebuild();
    }

    //-----------------------------
    const drawCircle = (color) => {
        let c = document.createElement('canvas');

        c.setAttribute('width', '60');
        c.setAttribute('height', '60');
        c.setAttribute('value', 'gray');
        
        let ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.arc(30, 30, 25, 0, 2 * Math.PI);
        ctx.fillStyle = color || 'gray';
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.stroke();

        c.addEventListener('click', function() {
            let currColor = this.getAttribute('value');
            let newColor = colorMap.findIndex(x => x === currColor);
            let maxColor = parseInt(localStorage.getItem('colors'));
            if(newColor === maxColor){
                newColor = 0;
            } else {
                newColor++;
            }
            this.setAttribute('value', colorMap[newColor]);
            let ctx = this.getContext('2d');
            ctx.fillStyle = colorMap[newColor];
            ctx.fill();
        });

        return c;
    };

    const createRow = () => {
        let length = localStorage.getItem('size');
        let row = document.createElement('div');
        row.setAttribute('id', 'row');
        for(let i = 0; i < length; i++){
            row.appendChild(drawCircle());
        }
        game.insertBefore(row, game.firstChild);
    };

    const sendNewGame = () => {
        let newGame = {
            size: parseInt(localStorage.getItem('size')),
            colors: parseInt(localStorage.getItem('colors')),
            moves: localStorage.getItem('moves') > 0 ? parseInt(localStorage.getItem('moves')) : 0
        };

        axios.post('/game/new', newGame)
            .then( resp => {
                if( resp.data.game ) {
                    let uuid = resp.data.game;
                    localStorage.setItem('game', uuid);
                    document.getElementById('uuid').innerText = `game: ${resp.data.game}`;
                    createRow();
                }
            })
            .catch( err => console.error(err));
    };

    const sendMove = (code) => {
        let move = {
            game: localStorage.getItem('game'),
            move: code
        };
        
        axios.post('/game/move', move)
            .then( resp => {
                let data = resp.data;
                if(data.black === -1 && data.white === -1){
                    alert('No more moves');
                    //show correct code
                    return;
                }
                let result = document.createElement('div');
                let black = document.createElement('p');
                let white = document.createElement('p');
                result.setAttribute('id', 'result');
                black.setAttribute('id', 'black');
                white.setAttribute('id', 'white');
                black.innerHTML = `Black: ${data.black}`;
                white.innerHTML = `White: ${data.white}`;
                result.appendChild(black);
                result.appendChild(white);
                game.firstChild.appendChild(result);

                axios.post('/game/status', {game: data.game})
                    .then( resp => {
                        if(resp.data.solved === true) {
                            alert('You won!');
                            // clean localstorage, hide/show buttons
                        } else {
                            createRow();
                        }
                    })
                    .catch( err => console.error(err) );
            })
            .catch( err => console.error(err));
    };

    const cleanNode = (node) => {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };

    //-----------------------------
    newGameBtn.addEventListener('click', () => {
        localStorage.clear();
        cleanNode(game);
        newGameForm.hidden = false;
        newGameBtn.hidden = true;
    });

    startGame.addEventListener('click', () => {
        newGameForm.hidden = true;
        newGameBtn.hidden = false;
        checkBtn.hidden = false;

        let size = document.getElementById('size');
        let colors = document.getElementById('colors');
        let moves = document.getElementById('moves');
        localStorage.setItem('size', size.value);
        localStorage.setItem('colors', colors.value);
        localStorage.setItem('moves', moves.value);

        sendNewGame();
    });

    checkBtn.addEventListener('click', () => {
        if(game.hasChildNodes()) {
            let row = game.firstElementChild;
            let code = [];
            for(let c of row.children){
                code.push(colorMap.indexOf(c.getAttribute('value')));
            }
            // history global array, localstorage json.stringify
            sendMove(code);
        } 
    });
});