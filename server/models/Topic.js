const { Schema, model } = require('mongoose');

const topicSchema = new Schema({
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

// Calculate the total duration of the topic by adding the durations of the individual lessons
topicSchema.virtual('totalDuration').get(function() {
    const totalDuration = this.lessons.reduce((sum, lesson) => {
        return sum + lesson.duration;
    }, 0);

    return totalDuration;
});

module.exports = model('Topic', topicSchema);
