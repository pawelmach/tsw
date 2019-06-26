const konCont = require('../controllers/konController');

module.exports = function (socket, io) {
    socket.on('kon add', (kon) => {
        konCont.count()
            .then(val => {
                kon.id = val + 1;
                konCont.insert(kon)
                    .then(res => {
                        console.log(`Dodano konia o id: ${res.id}`);
                        io.emit('NEW_KON', kon);
                    });
            });
    });

    socket.on('kon edit', (kon) => {
        konCont.edit(kon)
            .then(res => {
                console.log(`Edytowano konia o id: ${res.id}`);
                io.emit('EDIT_KON', kon);
            });
    });

    socket.on('kon delete', (kon) => {
        konCont.remove(kon)
            .then(res => {
                console.log(`Usunieto konia o id: ${res.id}`);
                io.emit('DELETE_KON', kon);
            });
    });

    socket.on('fetch konie', () => {
        konCont.get().then(res => {
            console.log('konie get');
            socket.emit('FETCH_KONIE', res);
        });
    });

    socket.on('kon ocena', (kon) => {
        konCont.edit(kon).then(res => {
            console.log(`Oceniono konia o id: ${res.id}`);
            io.emit('OCENA_KON', kon);
        });
    });
};
