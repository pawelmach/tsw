const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const mongooseFindAndFilter = require('mongoose-find-and-filter');

// addplugin
mongoose.plugin(mongooseFindAndFilter);

// connect to mongo db
const mongoUri = 'mongodb://127.0.0.1:27017/konkurskoni';
mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});
