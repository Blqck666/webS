var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessagesSchema   = new Schema({
    sender_id: String,
    receiver_id : String,
    message_content: String
});

module.exports = mongoose.model('Messages', MessagesSchema);