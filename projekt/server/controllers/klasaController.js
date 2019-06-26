const mongoose = require('mongoose');

const KlasaSchema = new mongoose.Schema({
    id: Number,
    numer: Number,
    kat: String,
    komisja: Array
});

const Klasy = mongoose.model('Klasy', KlasaSchema, 'Klasy');

async function bulkInsert (data) {
    return Klasy.insertMany(data);
}

async function count () {
    return Klasy.countDocuments();
};

async function insert (klasa) {
    return new Klasy(klasa).save();
};

async function get () {
    return Klasy.find();
};

async function edit (klasa) {
    return Klasy.findByIdAndUpdate(klasa._id, klasa);
};

async function remove (klasa) {
    return Klasy.findByIdAndRemove(klasa._id);
};

module.exports = {
    bulkInsert,
    count,
    insert,
    get,
    edit,
    remove
};
