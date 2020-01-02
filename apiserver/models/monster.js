var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    name : String,
    hp : Number,
    mp : Number,
    level : { type: Number, default: 1 }
});

module.exports = mongoose.model('monster', monsterSchema);


