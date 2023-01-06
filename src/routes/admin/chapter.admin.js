import express from 'express';
import chapterController from '../../app/controllers/admin/chapter.controller.js';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import multer from 'multer';
// import crypto from 'crypto';
// import Chapter from '../../app/models/Chapter.js';
// import path from 'path';
// import mongoose from 'mongoose';

// const storage = new GridFsStorage({
//   url: 'mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// const connect = mongoose.createConnection(
//   'mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// let gfs;

// connect.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//     bucketName: 'uploads',
//   });
// });

// var type = upload.single('recfile');

const router = express.Router();

router.get('/overview', chapterController.allOverview);
// router.post('/overview', type, chapterController.add);
router.get('/basic', chapterController.allBasic);
router.get('/master', chapterController.allMaster);
router.get('/advanced', chapterController.allAdvanced);

export default router;
