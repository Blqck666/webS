var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RequestSchema   = new Schema({
    src: String,
    dest : String
});

module.exports = mongoose.model('Request', RequestSchema);