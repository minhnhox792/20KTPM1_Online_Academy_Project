import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully !!!');
  } catch (err) {
    console.log(err);
  }
};

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export default async () => {
//   try{
//         await mongoose.connect('mongodb://localhost:27017/Project_Web_Course',{
//         useNewUrlParser:true,

//         useUnifiedTopology:true
//     })
//     }
//     catch(err){
//         console.log(err);
//     }
// };
