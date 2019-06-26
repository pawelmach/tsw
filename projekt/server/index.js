const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = 3030;
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const usrContr = require('./controllers/userController');

function authenticate (socket, data, callback) {
    let username = data.username;
    let password = data.password;

    if (username === 'guest') {
        return callback(null, 'guest');
    }

    if (username === 'admin' && password === 'admin') {
        return callback(null, 'admin');
    }
    // usrContr.users.findOne({ username: username }, function (err, user) {
    //     if (err || !user) return callback(new Error('User not found'));
    //     return callback(null, user.password === password);
    // });
}

function postAuthenticate (socket, data) {
    let username = data.username;
    console.log(`User: ${username} connected`);
    if (username === 'guest') {
        socket.client.user = 'guest';
    } else {
        usrContr.users.findOne({ username: username }, function (err, user) {
            if (err) console.log(err);
            socket.client.user = user;
        });
    }
}

function disconnect (socket) {
    console.log(socket.id + ' disconnected');
}

require('socketio-auth')(io, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    disconnect: disconnect,
    timeout: 6000
});

require('./mongoose.config');

app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.listen(port, '0.0.0.0', function () {
    console.log(`Server started on port: ${port}`);
});

io.origins('*:*');
io.serveClient('transports', ['websocket']);
io.on('connection', socket => {
    socket.emit('CONNECT', true);

    require('./events/user-general')(socket, io);
    require('./events/klasy')(socket, io);
    require('./events/konie')(socket, io);
    require('./events/sedziowie')(socket, io);
});

exports = module.exports = app;
