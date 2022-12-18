import mongoose from "mongoose";
const Schema = mongoose.Schema;



const UserOTP = new Schema({
    username: String,
    otp: String,
    createdAt: { type: Date, default: Date.now },
    expiresAt:{ type: Date, default: Date.now },
  
}, {timestamps: true}); 




export default mongoose.model('UserOTP', UserOTP); 