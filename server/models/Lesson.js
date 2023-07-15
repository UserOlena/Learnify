const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            unique: false,
            required: true,
        },
        media: {
            type: String, //URL to image or video
            trim: true,
            max: 1,
            validate: {
                validator: function(url) {
                    return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
                },
                message: props => `${props.value} is not a valid URL`
            },       
        },
        duration: {
            type: Number, //estimated length of TIME IN MINUTES to complete lesson
            required: true,
            min: 1,
        }  
    });

    module.exports = model('Lesson', lessonSchema)