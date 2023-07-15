const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
});

module.exports = model('Review', reviewSchema);
