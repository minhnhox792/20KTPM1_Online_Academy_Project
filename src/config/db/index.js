import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully !!!');
  } catch (err) {
    console.log(err);
  }
};
