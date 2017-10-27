var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    id: String,
    username : String,
    email : String,
    img : String
});

module.exports = mongoose.model('user', userSchema);