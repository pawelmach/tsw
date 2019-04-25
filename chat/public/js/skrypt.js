/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';

// Inicjalizacja UI
document.onreadystatechange = () => {
	if (document.readyState === "interactive") {
		const chatStatus	= document.getElementById('chatStatus');
		const chatSend	  = document.getElementById('chatSend');
		const chatText 	  = document.getElementById('chatText');
		const chatMessages	= document.getElementById('chatMessages');
		const open	      = document.getElementById('open');
		const close			= document.getElementById('close');	
		const userName 		= document.getElementById('userName');
		const greenBullet = 'img/bullet_green.png';
		const redBullet   = 'img/bullet_red.png';
		let user;

		var chat;

		close.disabled = true;
		chatSend.disabled = true;

		// Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
		open.addEventListener('click', () => {
			open.disabled = true;
			userName.disabled = true;
			user = userName.value;
			chat = io(`http://${location.host}/chat`, {query: {userName: user}} );

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
	}
};
