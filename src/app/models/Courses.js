import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const date = new Date();

const Course = new Schema({
  title: {
    type: String,
    maxLength: 50,
    required: true,
  },
  category: {
    type: String,
    maxLength: 50,
    required: true,
  },
  lecturer: {
    type: String,
    maxLength: 50,
    required: true,
  },
  numberStudentRate: {
    type: Number,
  },
  description: {
    type: String,
    maxLength: 100,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  timeLength: {
    type: Number,
    default: date.getTime(),
  },
  createdAt: {
    type: Date,
    default: date.now,
  },
  updatedAt: {
    type: Date,
    default: date.now,
  },
});

// Course.plugin(mongoose_delete);
// Course.plugin(mongoose_delete, {
//   deleteAt: true,
//   overrideMethods: 'all',
// });

export default mongoose.model('Course', Course);
