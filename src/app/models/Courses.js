import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String , maxLength: 50, required: true},
  category: {type : String, maxLength: 50,required: true},
  teacher: {type: String, maxLength: 50,required: true},
  numberStudentRate: {type : Number},
  description: { type: String,  maxLength: 100, required: true},
  price: {type: Number,required: true},
  discount: {type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Course.plugin(mongoose_delete);
// Course.plugin(mongoose_delete, {
//   deleteAt: true,
//   overrideMethods: 'all',
// });

export default mongoose.model('Course', Course);
