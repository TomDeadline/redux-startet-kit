const mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    username: String,
    note: {
        text: [String],
        isThrough: [Boolean]
    }
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;





