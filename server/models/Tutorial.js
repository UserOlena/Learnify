const { Schema, model } = require('mongoose');

const tutorialSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
    },
    overview: {
      type: String,
      trim: true,
      required: [true, 'Overview is required!'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required!'],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    teacher: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Calculate the total duration of the tutorial by adding the durations of the individual lessons
tutorialSchema.virtual('totalDuration').get(function () {
  const totalDuration = this.lessons.reduce((sum, lesson) => {
    return sum + lesson.duration;
  }, 0);

  return totalDuration;
});

// Calculate the total duration of the tutorial by adding the durations of the individual lessons
tutorialSchema.virtual('averageRating').get(function () {
  const reviewsLength = this.reviews.length;
  const totalRating = this.reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  // Calculate the average rating
  const averageRating = reviewsLength > 0 ? totalRating / reviewsLength : 0;

  return averageRating;
});

module.exports = model('Tutorial', tutorialSchema);
