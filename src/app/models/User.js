import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema(
  {
    actived: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 500,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    education: {
      type: String,
      maxLength: 100,
    },
    about: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: 'Student',
    },
    courseList: {
      type: [
        {
          type: ObjectId,
          ref: 'Course',
        },
      ],
      default: [],
    },
    favoriteList: {
      type: [
        {
          type: ObjectId,
          ref: 'Course',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    verified: { type: Boolean, default: false },
    googleId: {
      type: String, default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('Users', User);
