const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const users = mongoose.model('Users', UserSchema);

module.exports = { users };
