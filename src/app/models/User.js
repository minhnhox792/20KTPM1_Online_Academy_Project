import mongoose from "mongoose";
const Schema = mongoose.Schema;



const User = new Schema({
  username:{
    type: String, required: true, minLength: 6, maxLength:50, unique: true
  },
    email: {type: String, required: true, minLength: 6, maxLength:50, unique: true},
    password:{type: String, required: true,},
    role:{
      type: String, default: "Student"
    }
  
}, {timestamps: true}); 



export default mongoose.model('courses', User); 