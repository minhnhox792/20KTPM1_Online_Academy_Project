import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Project_Web_Course', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully !!!');
  } catch (err) {
    console.log(err);
  }
};
