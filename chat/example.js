socket.on('message', (data, user) => {
    console.log(`/chat: ${data}`);
    let message = `${user} napisał: ${data}`;
    socket.emit('message', message);
    socket.broadcast.emit('message', message);
});

socket.on('userName', (user) => {
    if(users.find(x => x === user) === undefined){
        socket.emit('userName', true);
    } else {
        socket.emit('userName', false);
    }
});

socket.on('addUser', (user) => {
    users.push(user);
    socket.user = user;
});

socket.on('logout', () => {
    users.splice(users.indexOf(socket.user), 1);
});


//client
const chatStatus	= document.getElementById('chatStatus');
		const chatSend		= document.getElementById('chatSend');
		const chatText		= document.getElementById('chatText');
		const chatMessages	= document.getElementById('chatMessages');
		const open			= document.getElementById('open');
		const close			= document.getElementById('close');	
		const userName 		= document.getElementById('userName');
		const userNameStat	= document.getElementById('userNameStatus');
		const greenBullet	= 'img/bullet_green.png';
		const redBullet		= 'img/bullet_red.png';
		
		let user;
		var chat = io(`http://${location.host}/`);

		close.disabled = true;
		chatSend.disabled = true;
		
		chat.on('connect', () => {
			close.disabled = false;
			chatSend.disabled = false;
			chatStatus.src = greenBullet;
			console.log('Nawiązano połączenie z kanałem „/chat”');
		});
		chat.on('disconnect', () => {
			open.disabled = false;
			chatStatus.src = redBullet;
			console.log('Połączenie z kanałem „/chat” zostało zakończone');
		});
		chat.on('message', (data) => {
			let newMessage = document.createElement('td');
			let newRow = document.createElement('tr');
			newMessage.textContent = data;
			newRow.appendChild(newMessage);
			chatMessages.appendChild(newRow);
		});
		chat.on('userName', (data) => {
			console.log(data);
			if(data) {
				userNameStat.innerText = 'User Name is correct';
				userNameStat.style = 'color: green';
				open.disabled = false;
			} else {
				userNameStat.innerText = 'User Name is incorrect';
				userNameStat.style = 'color: red';
				open.disabled = true;
			}
		});

		// Zamknij połączenie po kliknięciu guzika „Rozłącz”
		close.addEventListener('click', () => {
			close.disabled = true;
			chatSend.disabled = true;
			while(chatMessages.hasChildNodes()){
				chatMessages.firstChild.remove();
			}
			userName.disabled = false;
			chat.disconnect();
		});
		
		// Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
		chatSend.addEventListener('click', () => {
			chat.emit('message', chatText.value, user);
			console.log(`Wysłałem wiadomość /chat: ${chatText.value}`);
			chatText.value = '';
		});
		
		userName.addEventListener('input', () => {
			user = userName.value;
			chat.emit('userName', user);
		});

		open.addEventListener('click', () => {
			chat.emit('nick avaible', 'asd');
		});
	}
};

document.addEventListener('close', () => {
	window.chat.emit('logout');
});