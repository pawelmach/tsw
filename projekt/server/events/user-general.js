const usrCont = require('../controllers/userController');
const klasyCont = require('../controllers/klasaController');
const konieCont = require('../controllers/konController');
const sedzCont = require('../controllers/sedziowieController');
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = function (socket, io) {
    socket.on('newRandom', () => {
        axios.get('http://localhost:3000/klasy')
            .then(klasy => {
                mongoose.connection.db.dropCollection('Klasy', () => {
                    console.log('Collection Klasy removed.');
                    klasyCont.bulkInsert(klasy.data)
                        .then(res => {
                            io.emit('FETCH_KLASY', klasy.data);
                        });
                });
            });

        axios.get('http://localhost:3000/konie')
            .then(konie => {
                mongoose.connection.db.dropCollection('Konie', () => {
                    console.log('Collection Konie removed.');
                    konieCont.bulkInsert(konie.data)
                        .then(res => {
                            io.emit('FETCH_KONIE', konie.data);
                        });
                });
            });

        axios.get('http://localhost:3000/sedziowie')
            .then(sedziowie => {
                mongoose.connection.db.dropCollection('Sedziowie', () => {
                    console.log('Collection Sedziowie removed.');
                    sedzCont.bulkInsert(sedziowie.data)
                        .then(res => {
                            io.emit('FETCH_SEDZIOWIE', sedziowie.data);
                        });
                });
            });
    });
};
