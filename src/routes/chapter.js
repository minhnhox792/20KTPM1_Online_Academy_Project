import chapter from "../app/models/Chapter.js";
import express from "express";
import mongoose from "mongoose";
import path from 'path';
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from 'crypto'
import multer from "multer";
import chapterController from "../app/controllers/chapterController.js";

const router = express.Router()

const storage = new GridFsStorage({
  url: "mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      })
    })
  }
})

const upload = multer({
  storage: storage
})

const connect = mongoose.createConnection("mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let gfs;

connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads"
  })
})
var type = upload.single('recfile');
router.post('/video', type, (req, res, next) => {
  console.log("POST VIDEO")
  console.log(req.file.id)
  const newchapter = new chapter({
    title: req.body.title,
    filename: req.file.id,
  })
  
  newchapter.save()
    .then((chapter) => {
      return res.status(200).json({
        chapter,
        message: "Upload video successfully !"
      })
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})
router.post('/image', type, (req, res, next) => {
  console.log("POST VIDEO")
  console.log(req.file.id)
  const newchapter = new chapter({
    title: req.body.title,
    filename: req.file.id,
  })
  
  newchapter.save()
    .then((chapter) => {
      return res.status(200).json({
        chapter,
        message: "Upload video successfully !"
      })
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})
router.get('/:filename', chapterController.getVideo)
export default router