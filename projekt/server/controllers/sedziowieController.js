const mongoose = require('mongoose');

const SedziowieSchema = new mongoose.Schema({
    id: Number,
    sedzia: String,
    kraj: String
});

const Sedziowie = mongoose.model('Sedziowie', SedziowieSchema, 'Sedziowie');

async function bulkInsert (data) {
    return Sedziowie.insertMany(data);
}

async function count () {
    return Sedziowie.countDocuments();
};

async function insert (sedzia) {
    return new Sedziowie(sedzia).save();
};

async function get () {
    return Sedziowie.find();
};

async function edit (sedzia) {
    return Sedziowie.findByIdAndUpdate(sedzia._id, sedzia);
};

async function remove (sedzia) {
    return Sedziowie.findByIdAndRemove(sedzia._id);
};

module.exports = {
    bulkInsert,
    count,
    insert,
    get,
    edit,
    remove
}
;
