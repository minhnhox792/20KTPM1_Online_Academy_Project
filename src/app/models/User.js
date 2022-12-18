import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
      unique: true,
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
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    education: {
      type: String,
      maxLength: 100,
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('User', User);
