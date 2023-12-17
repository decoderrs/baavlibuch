const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const contactlogSchema = new Schema({
    localhost_name: {
        type: String,
        required: true
    },
    nos_connections: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
});

var Contactlogs = mongoose.model('ContactLog',contactlogSchema);

module.exports = Contactlogs;