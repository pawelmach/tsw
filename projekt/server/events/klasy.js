const klasaCont = require('../controllers/klasaController');
const axios = require('axios');

module.exports = function (socket, io) {
    socket.on('klasa add', (klasa) => {
        klasaCont.count()
            .then(val => {
                klasa.id = val + 1;
                klasaCont.insert(klasa)
                    .then(res => {
                        console.log(`Dodano klase o id: ${res.id}`);
                        io.emit('NEW_KLASA', klasa);
                    });
            });
    });

    socket.on('klasa edit', (klasa) => {
        klasaCont.edit(klasa)
            .then(res => {
                console.log(`Edytowano klase o id: ${res.id}`);
                socket.emit('EDIT_KLASA', klasa);
                socket.broadcast.emit('EDIT_KLASA', klasa);
            });
    });

    socket.on('klasy delete', (klasa) => {
        klasaCont.remove(klasa)
            .then(res => {
                console.log(`Usunieto klase o id: ${res.id}`);
                socket.emit('DELETE_KLASA', klasa);
                socket.broadcast.emit('DELETE_KLASA', klasa);
            });
    });

    socket.on('fetch klasy', () => {
        klasaCont.get().then(res => {
            console.log('klasy get');
            socket.emit('FETCH_KLASY', res);
        });
    });
};
