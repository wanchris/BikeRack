var mongoose = require('mongoose');
var User = require('user');
var Id = require('id');

var locationSchema = mongoose.Schema({
    user: User,
    locations : [id]
});

module.exports = mongoose.model('Location', locationSchema);
