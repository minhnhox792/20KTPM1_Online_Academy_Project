import chapter from "../app/models/Chapter.js";
import express from "express";
import chapterController from "../app/controllers/chapterController.js";
import upload from "../util/upload.js";

const router = express.Router()

//postman 
router.post('/', upload, (req, res, next) => {
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