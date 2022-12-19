import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubCategory = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parentCategory: {
    type: ObjectId,
    ref: 'Category',
  },
});

export default mongoose.model('SubCategory', SubCategory);
