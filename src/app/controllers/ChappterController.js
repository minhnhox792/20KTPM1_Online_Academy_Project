// import Chapter from '../models/Chapter.js';
// import mongoose from "mongoose";
// import path from 'path';
// import {GridFsStorage} from "multer-gridfs-storage";
// import crypto from 'crypto'
// import multer from "multer"; 
// // crack
// // Oh no - Đoạn code đã bị block
// // 100k to UNLOCK 
// // MOMO 0783877917 y
// // GIẢM GIÁ NGAY HÔM NAY 
// //hacker lỏd

// // mp3 và mp4 xài chung 1 thư viện

// const storage = new GridFsStorage({
//   url: "mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority",
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err)
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         })
//     })
//   }
// })

// const upload = multer({ storage });  

// const connect = mongoose.createConnection("mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true  
// })

// let gfs; 

// connect.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//       bucketName: "uploads"
//     })
// })

// // http://localhost:3000/upload 
// // post 
// // form-data = 
// var type = upload.single('recfile');
// // recfile: 
// const chapterController = {
//     postVideo: ( type , async (req, res, next) => {
//         console.log("POST VIDEO")
//         const newChapter = new Chapter({
//             title: req.body.title, 
//             file: req.file.id, 
//         }) 

//         await newChapter.save()
//             .then((chapter) => {
//                 return res.status(200).json({
//                     chapter,
//                     message: "Upload video successfully !"
//                 })
//             })
//             .catch(err => {
//                 return res.status(500).json(err)
//             })
//     }) 
// }

// export default chapterController