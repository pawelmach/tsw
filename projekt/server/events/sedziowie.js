const sedziowieCont = require('../controllers/sedziowieController');

module.exports = function (socket, io) {
    socket.on('sedzia add', (sedzia) => {
        sedziowieCont.count()
            .then(val => {
                sedzia.id = val + 1;
                sedziowieCont.insert(sedzia)
                    .then(res => {
                        console.log(`Dodano sedziego o id: ${res.id}`);
                        io.emit('NEW_SEDZIA', sedzia);
                    });
            });
    });

    socket.on('sedzia edit', (sedzia) => {
        sedziowieCont.edit(sedzia)
            .then(res => {
                console.log(`Edytowano sedziego o id: ${res.id}`);
                io.emit('EDIT_SEDZIA', sedzia);
            });
    });

    socket.on('sedzia delete', (sedzia) => {
        sedziowieCont.remove(sedzia)
            .then(res => {
                console.log(`Usunieto sedziego o id: ${res.id}`);
                io.emit('DELETE_SEDZIA', sedzia);
            });
    });

    socket.on('fetch sedziowie', () => {
        sedziowieCont.get().then(res => {
            console.log('sedziowie get');
            socket.emit('FETCH_SEDZIOWIE', res);
        });
    });
};
