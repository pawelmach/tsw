/* jshint esversion: 6, browser: true, devel: true */

let drawCircle = (color) => {
    let c = document.createElement('canvas');
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    return c;
};

document.addEventListener('DOMContentLoaded', () => {

    let code = [2, 3, 2, 1, 3, 2];
    let game = document.getElementById('game');
    
    code.map((x, i) => {
        let p = document.createElement('div');
        p.setAttribute('id', 'row');
        switch (x) {
            case 1:
                p.appendChild(drawCircle("blue"));
                break;
            case 2: 
                p.appendChild(drawCircle("red"));
                break;
            case 3: 
                p.appendChild(drawCircle("pink"));
                break;
            default:
                p.appendChild(drawCircle("gray"));
                break;
        }
        game.appendChild(p);
    });



});