import Chapter from "../app/models/Chapter.js";
import express from "express";
import mongoose from "mongoose";
import path from 'path';
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from 'crypto'
import multer from "multer"; 

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
  
  const upload = multer( {
    storage: storage
  } )
  
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
// postman 
router.post('/', type, (req, res, next) => {
    console.log("POST VIDEO")
    console.log(req.file.id)
    const newChapter = new Chapter({
        title: req.body.title, 
        filename: req.file.id, 
    }) 

    newChapter.save()
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

export default router