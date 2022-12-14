import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connect database successfully !!!');
  } catch (err) {
    console.log(err);
  }
};
