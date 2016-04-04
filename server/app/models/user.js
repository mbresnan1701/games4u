var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var db = require('../dbsetup.js');

var User = db.mongoose.model('User', db.userSchema);

module.exports = User;
