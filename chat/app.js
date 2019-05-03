//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');
const path = require('path');

const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

// Tingodb

const Db = require('tingodb')().Db;
const db = new Db(path.join(__dirname, 'db'), {});

const users		= db.collection('users');
const rooms		= db.collection('rooms');
const messages	= db.collection('messages');

// socket.io

io.on('connection', (socket) => {
	console.log(`User ${socket.client.id} connected`);
	rooms.find().toArray((err, res) => {
		if(!err){
			if(res){
				let roomData = res.map(x => x.name);
				socket.emit('connection', roomData);
			}
		} else {
			console.error(`rooms-error: ${err}`);
		}
	});

	socket.on('nick avaible', (nick) => {
		users.findOne({nick: nick}, (err, res) => {
			if(!err){
				if(!res){
					socket.emit('nick avaible', true);
				} else {
					socket.emit('nick avaible', false);
				}
			} else {
				console.error(err);
			}
		});
	});

	socket.on('nick create', (nick) => {
		users.findAndModify(
			{id: socket.client.id},
			['id'], 
			{$set: {"nick": nick}},
			(err, res) => {
			if(!err) {
				if(res) {
					console.log(`User with id: ${socket.client.id} changed his nickname to ${nick}`);
					socket.emit('nick create', nick);
				} else {
					users.insert({id: socket.client.id, nick: nick});
				}
			} else {
				console.error(err);
			}
		});
	});

	socket.on('room avaible', (room) => {
		rooms.findOne({name: room}, (err, res) => {
			if(!err){
				if(!res){
					socket.emit('room avaible', true);
				} else {
					socket.emit('room avaible', false);
				}
			} else {
				console.error(err);
			}
		});
	});

	socket.on('room create', (room) => {
		rooms.insert({name: room});
		socket.join(room);
		rooms.find().toArray((err, res) => {
			if(!err){
				if(res){
					let currRooms = res.map(x => x.name);
					socket.emit('room create', currRooms);
				}
			} else {
				console.error(err);
			}
		});
	});

	socket.on('message', (roomName, msg) => {
		users.findOne({id: socket.client.id}, (err, res) => {
			if(!err){
				if(res){
				let nmsg = `${res.nick}: ${msg}`;
				let date = new Date(Date.now());
				socket.to(roomName).emit('message', nmsg, date);
				socket.emit('message', nmsg, date);
				messages.insert({room: roomName, msg: nmsg, date: date});
			}}
		});
	});

	socket.on('room change', (room) => {
		socket.leaveAll();
		socket.join(room);
		console.log(room);

		messages.find({room: room})
			.toArray((err, res) => {
				if(!err){
					if(res){
						let msgs = res.map(x => x.msg);
						socket.emit('room change', {name: room, msgs: msgs});
					}
				} else {
					console.error(err);
				}
			});
	});

	socket.on('disconnect', () => {
		// delete from users
		console.log(`User ${socket.client.id} disconnected`);
	});
});

// -------------

httpServer.listen(3000, () => {
	console.log('Serwer HTTP działa na pocie 3000');
});
