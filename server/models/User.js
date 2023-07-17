const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: [true, 'Provided username address already exists!'],
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    unique: [true, 'Provided email address already exists!'],
    required: [true, 'Email address is required!'],
    validate: {
      validator: function (value) {
        return /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tutorials: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tutorial',
    },
  ],
  teachingTutorials: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tutorial',
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);
