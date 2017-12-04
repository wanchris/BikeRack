var mongoose = require('mongoose');
var Location = require('./locations');

var locationSchema = mongoose.model('Location').schema;

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        locations: [locationSchema]

});

module.exports = mongoose.model('User', userSchema);
