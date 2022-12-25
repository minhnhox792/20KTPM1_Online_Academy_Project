import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const date = new Date();

const Course = new Schema({
  name: {
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
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  rating: {
    type: Number,
  },
  numberStudentRate: {
    type: Number,
    default: 0,
  },
  shortDesc: {
    type: String,
    maxLength: 400,
  },
  fullDesc: {
    type: String,
    maxLength: 1000,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  overview: {
    type: [
      {
        type: ObjectId,
        ref: 'Chapter',
      },
    ],
    default: [],
  },
  basicCode: {
    type: [
      {
        type: ObjectId,
        ref: 'Chapter',
      },
    ],
    default: [],
  },
  advancedCode: {
    type: [
      {
        type: ObjectId,
        ref: 'Chapter',
      },
    ],
    default: [],
  },
  masterCode: {
    type: [
      {
        type: ObjectId,
        ref: 'Chapter',
      },
    ],
    default: [],
  },
  timeLength: {
    type: Number,
    default: date.getTime(),
  },
  studentList: {
    type: [
      {
        type: ObjectId,
        ref: 'User',
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
});


// Course.plugin(mongoose_delete);
// Course.plugin(mongoose_delete, {
//   deleteAt: true,
//   overrideMethods: 'all',
// });

export default mongoose.model('Course', Course);
