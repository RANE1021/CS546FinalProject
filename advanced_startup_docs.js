var MongoClient = require('mongodb').MongoClient,
settings = require('./config.js');
const uuidv4 = require('uuid/v4');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function (db) {
        ///\remark VK: Use this space to spawn DB with initial data.    
        //     return db.collection("recipes").drop().then(function () {
        //         return db;
        //     }, function () {
        //         // We can recover from this; if it can't drop the collection, it's because
        //         // the collection does not exist yet!
        //         return db;
        //     });
        // }).then(function (db) {
        //     // We've either dropped it or it doesn't exist at all; either way, let's make 
        //     // a new version of the collection
        //     return db.createCollection("recipes");
        // });
}

// By exporting a function, we can run 
var exports = module.exports = runSetup;