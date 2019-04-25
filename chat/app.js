//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

// io.set('heartbeat timeout', 10);
// io.set('heartbeat interval', 10);

let users = [];

const chat = io
    .of('/chat')
    .on('connect', (socket) => {
        console.log('Uruchomiłem kanał „/chat”');
        console.log(`Podłączył się użytkownik o nicku: ${socket.handshake.query.userName}`);

        socket.on('message', (data, user) => {
            console.log(`/chat: ${data}`);
            let message = `${user} napisał: ${data}`;
            socket.emit('message', message);
            socket.broadcast.emit('message', message);
        });

        socket.on('userName', (user) => {
        });

        socket.on('disconnect', () => {

        });
    });

httpServer.listen(3000, () => {
    console.log('Serwer HTTP działa na pocie 3000');
});
