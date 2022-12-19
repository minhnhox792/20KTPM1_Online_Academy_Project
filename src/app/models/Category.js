import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Category = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subCategories: {
    type: [
      {
        type: ObjectId,
        ref: 'SubCategory',
      },
    ],
  },
});

export default mongoose.model('Category', Category);
