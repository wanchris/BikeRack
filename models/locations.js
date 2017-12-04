var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
    name : String
});

module.exports = mongoose.model('Location', locationSchema);
