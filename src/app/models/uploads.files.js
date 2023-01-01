import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const fileSchema = new Schema({
    length : {
        type: Number
    },
    chunkSize : {
        type: Number
    },
    uploadDate : {
        type: Date
    },
    filename: {
        type: String
    },
    contentType: {
        type: String
    }
});

export default mongoose.model('uploads.files', fileSchema);