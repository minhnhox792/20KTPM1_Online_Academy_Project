import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chapter = new Schema({
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

export default mongoose.model('chapter', chapter);
