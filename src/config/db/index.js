
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://dangminh:dangminh@cluster0.h6gzms7.mongodb.net/Project_Web_Course?retryWrites=true&w=majority', ()=>{
      console.log('Connect database successfully !!!')
    });

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