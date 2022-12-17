import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  try {
<<<<<<< Updated upstream
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully !!!');
=======
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://dangminh:dangminh@cluster0.h6gzms7.mongodb.net/Project_Web_Course?retryWrites=true&w=majority', ()=>{
      console.log('Connect database successfully !!!')
    });

>>>>>>> Stashed changes
  } catch (err) {
    console.log(err);
  }
};
