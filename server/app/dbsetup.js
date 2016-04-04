var mongoose = require('mongoose');

var db = {};
db.mongoose = mongoose;
mongoose.connect('mongodb://localhost/games4u');


db.userSchema = mongoose.Schema({
  username: String,
  password: String,
  gamesStr: String
});



module.exports = db;
