import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Category = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    default: 'none',
  },
  subCategories: {
    type: [
      {
        type: String,
        unique: true,
        default: [],
      },
    ],
    default: [],
  },
});

export default mongoose.model('Category', Category);
