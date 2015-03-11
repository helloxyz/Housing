var mongoose = require('mongoose');
var User = require('../models/user');
var config = require('config');

var dbHost = config.get('DbConfig.host');
var dbName = config.get('DbConfig.dbName');
var connectionString = 'mongodb://' + dbHost + '/' + dbName;

mongoose.connect(connectionString, function(err){
    if(err) {
        console.log(err);
    }
    else {
        console.log("Connected to DB: " + dbName);
    }
});

exports.mongoose = function() {};
