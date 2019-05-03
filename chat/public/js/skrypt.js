/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';

// Inicjalizacja UI
document.onreadystatechange = () => {
	if (document.readyState === "interactive") {

		const nickValid		= document.getElementById('nickValid');
		const nick			= document.getElementById('nick');
		const newNick		= document.getElementById('newNick');
		const nickname		= document.getElementById('nickname');

		const newRoom		= document.getElementById('newRoom');
		const roomValid		= document.getElementById('roomValid');
		const room			= document.getElementById('room');

		const rooms			= document.getElementById('rooms');

		const messages		= document.getElementById('messages');
		const roomName		= document.getElementById('roomName');
		const msgInput		= document.getElementById('msgInput');
		const send			= document.getElementById('send');

		let chat = io(`http://${location.host}/`);

		window.onload = () => {
			nick.value = '';
			room.value = '';
			newNick.disabled = true;
			newRoom.disabled = true;
			room.disabled = true;
			send.disabled = true;
			msgInput.disabled = true;
		};

		// Socket events
		chat.on('connection', (roomsData) => {
			displayRooms(roomsData, true);
		});

		chat.on('nick avaible', (avaible) => {
			if(avaible){
				nickValid.innerText = 'Nick is avaible';
				nickValid.style = 'color: green';
				newNick.disabled = false;
			} else {
				nickValid.innerText = 'Nick is not avaible';
				nickValid.style = 'color: red';
				newNick.disabled = true;
			}
		});

		chat.on('nick create', (newnick) => {
			nickValid.innerText = '';
			nickname.innerText = newnick;
			newNick.disabled = true;
			room.disabled = false;
			rooms.childNodes.forEach(x => x.disabled = false);
		});

		chat.on('room avaible', (avaible) => {
			if(avaible){
				roomValid.innerText = 'Room name is avaible';
				roomValid.style = 'color: green';
				newRoom.disabled = false;
			} else {
				roomValid.innerText = 'Room name is not avaible';
				roomValid.style = 'color: red';
				newRoom.disabled = true;
			}
		});

		chat.on('room create', (roomsData) => {
			roomValid.innerText = '';
			newRoom.disabled = true;
			room.value = '';
			displayRooms(roomsData);
		});

		chat.on('room change', (roomData) => {
			while(messages.hasChildNodes()){
				messages.firstChild.remove();
			}
			roomName.innerText = roomData.name;
			roomData.msgs.forEach(msg => displayMsg(msg));
			send.disabled = false;
			msgInput.disabled = false;
		});

		chat.on('message', (msg, date) => {
			displayMsg(msg, date);
		});

		// Listeners

		newNick.addEventListener('click', () => {
			chat.emit('nick create', nick.value);
		});

		nick.addEventListener('input', () => {
			if(nick.value === ''){
				newNick.disabled = true;
				nickValid.innerText = '';
			} else {
				newNick.disabled = false;
				chat.emit('nick avaible', nick.value);
			}
		});

		room.addEventListener('input', () => {
			if(room.value === ''){
				newRoom.disabled = true;
				roomValid.innerText = '';
			} else {
				newRoom.disabled = false;
				chat.emit('room avaible', room.value);
			}
		});

		newRoom.addEventListener('click', () => {
			chat.emit('room create', room.value);
		});

		send.addEventListener('click', () => {
			if(msgInput.value !== ''){
				chat.emit(
					'message', 
					roomName.innerText, 
					msgInput.value
				);
				msgInput.value = '';
			}
		});

		// Helpers

		const displayRooms = (rms, disable) => {
			while(rooms.hasChildNodes()){
				rooms.firstChild.remove();
			}
			rms.forEach(r => {
				let btn = document.createElement('input');
				btn.type = 'button';
				btn.value = r;
				if(disable){
					btn.disabled = true;
				} 
				btn.addEventListener('click', function() {
					chat.emit('room change', this.value);
				});
				rooms.appendChild(btn);
			});
		};

		const displayMsg = (msg, date) => {
			let p = document.createElement('p');
			let span = document.createElement('span');
			span.innerText = date;
			p.innerText = msg;
			p.appendChild(span);
			messages.appendChild(p);
		};
	}
};