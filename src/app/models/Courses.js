import mongoose from 'mongoose';
import mongoo from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slug: { type: String, slug: 'name', unique: true },
});

mongoo.plugin(slug);
Course.plugin(mongoose_delete);
Course.plugin(mongoose_delete, {
  deleteAt: true,
  overrideMethods: 'all',
});

export default mongoose.model('Course', Course);
