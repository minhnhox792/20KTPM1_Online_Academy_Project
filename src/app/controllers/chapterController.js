
import mongoose from "mongoose";
// import chapter from "../models/Chapter.js";
// import uploadsFiles from "../models/uploads.files.js";
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
const chapterController = {
    getVideo: async (req, res) => {
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No files available " + req.params.filename
                })
            }
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
                'Connection': 'Keep-Alive',
                'Transfer-encoding': 'chunked',
                'Content-Length': files[0].length
            });
            gfs.openDownloadStreamByName(req.params.filename).pipe(res)
        })
    },
}
export default chapterController