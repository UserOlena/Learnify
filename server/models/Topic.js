const { Schema, model } = require('mongoose');

const topicSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required!'],
    },
    // Specify on front-end that the entered duration is in minutes
    durationMin: {
        type: Number,
        trim: true,
        required: [true, 'Duration is required!'],
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
    teacherId: [
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
});

module.exports = model('Topic', topicSchema);
