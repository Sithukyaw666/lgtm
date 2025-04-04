const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedDate: Date,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);