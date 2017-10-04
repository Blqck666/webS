var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FriendsSchema   = new Schema({
    first_user_id: String,
    second_user_id : String
});

module.exports = mongoose.model('Friends', FriendsSchema);