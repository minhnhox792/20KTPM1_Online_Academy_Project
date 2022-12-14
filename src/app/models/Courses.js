import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String , maxLength: 50, required: true},
<<<<<<< HEAD
  category: {type : String, maxLength: 50, required: true},
  teacher: {type: String, maxLength: 50, required: true},
=======
  category: {type : String, maxLength: 50,required: true},
  teacher: {type: String, maxLength: 50,required: true},
>>>>>>> 3b404adf4b09c1533cb6e22a8482ecf7980f1f2f
  numberStudentRate: {type : Number},
  description: { type: String,  maxLength: 100, required: true},
  price: {type: Number,required: true},
  discount: {type: Number},
  view: {type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Course.plugin(mongoose_delete);
// Course.plugin(mongoose_delete, {
//   deleteAt: true,
//   overrideMethods: 'all',
// });

export default mongoose.model('Course', Course);
