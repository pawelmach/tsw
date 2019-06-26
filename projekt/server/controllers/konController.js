const mongoose = require('mongoose');

const KonSchema = new mongoose.Schema({
    id: Number,
    numer: Number,
    klasa: Number,
    rocznik: Number,
    nazwa: String,
    kraj: String,
    masc: String,
    plec: String,
    hodowca: {
        nazwa: String,
        kraj: String
    },
    wlasciciel: {
        nazwa: String,
        kraj: String
    },
    rodowod: {
        o: {
            nazwa: String,
            kraj: String
        },
        m: {
            nazwa: String,
            kraj: String
        },
        om: {
            nazwa: String,
            kraj: String
        }
    },
    wynik: {
        noty: [{
            typ: Number,
            glowa: Number,
            kloda: Number,
            nogi: Number,
            ruch: Number,
            suma: Number
        }],
        miejsce: {
            type: Number,
            default: 0
        },
        rozjemca: mongoose.Schema.Types.Mixed,
        punkty: {
            type: Number,
            default: 0
        },
        sumT: {
            type: Number,
            default: 0
        },
        sumG: {
            type: Number,
            default: 0
        },
        sumK: {
            type: Number,
            default: 0
        },
        sumN: {
            type: Number,
            default: 0
        },
        sumR: {
            type: Number,
            default: 0
        }
    }
});

const Konie = mongoose.model('Konie', KonSchema, 'Konie');

async function bulkInsert (data) {
    return Konie.insertMany(data);
}

async function count () {
    return Konie.countDocuments();
};

async function insert (kon) {
    return new Konie(kon).save();
};

async function get () {
    return Konie.find();
};

async function edit (kon) {
    return Konie.findByIdAndUpdate(kon._id, kon);
};

async function remove (kon) {
    return Konie.findByIdAndRemove(kon._id);
};

module.exports = {
    bulkInsert,
    count,
    insert,
    get,
    edit,
    remove
};
