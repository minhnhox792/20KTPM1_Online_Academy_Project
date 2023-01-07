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
    required: true,
  },
  lecturer: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  nameLecturer: {
    type: String,
    require: true,
    default: '',
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
        ref: 'chapter',
      },
    ],
    default: [],
  },
  basicCode: {
    type: [
      {
        type: ObjectId,
        ref: 'chapter',
      },
    ],
    default: [],
  },
  advancedCode: {
    type: [
      {
        type: ObjectId,
        ref: 'chapter',
      },
    ],
    default: [],
  },
  masterCode: {
    type: [
      {
        type: ObjectId,
        ref: 'chapter',
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
  viewWeekly: {
    type: Number,
    default: 0,
  },
  quantityBuy: {
    type: Number,
    default: 0,
  },
  totalBuy: {
    type: Number,
    default: 0,
  },
  comment: {
    type: [
      {
        _id: {
          type: ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
          maxLength: 100,
        },
        content: {
          type: String,
          maxLength: 1000,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  isAdd: {
    type: Boolean,
    default: false,
  },
  complete:{
    type: Boolean,
    default: false,
  },
  subCategory: {
    type: String,
    default: ''
  },
  isDisable:{
    type: Boolean,
    default: false,
  }
});

// Course.plugin(mongoose_delete);
// Course.plugin(mongoose_delete, {
//   deleteAt: true,
//   overrideMethods: 'all',
// });

export default mongoose.model('Course', Course);
