const { Schema, model } = require('mongoose');

const lessonSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
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
      validator: function (url) {
        return /^(https?:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.avif)(\?[^\s[",><]*)?$/.test(
          url
        );
      },
      message: (props) => `${props.value} is not a valid image URL`,
    },
  },
  duration: {
    type: Number, //estimated length of TIME IN MINUTES to complete lesson
    required: true,
    min: 1,
  },
});

module.exports = model('Lesson', lessonSchema);
