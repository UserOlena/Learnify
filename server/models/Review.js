const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

module.exports = model('Review', reviewSchema);
