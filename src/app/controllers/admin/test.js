
// import mongoose from "mongoose";
import mongodb from "mongodb"
// import chapter from "../models/chapter.js";
const url = "mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority"
// const connect = mongoose.createConnection("mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// let gfs;

// connect.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//         bucketName: "uploads"
//     })
// })
const chapterController = {
    getVideo: async (req, res) => {
        mongodb.MongoClient.connect(url, function (error, client) {
            if (error) {
                res.status(500).json(error);
                return;
            }

            const range = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
            }

            const db = client.db('videos');
            // GridFS Collection
            db.collection('fs.files').findOne({}, (err, video) => {
                if (!video) {
                    res.status(404).send("No video uploaded!");
                    return;
                }

                // Create response headers
                const videoSize = video.length;
                const start = Number(range.replace(/\D/g, ""));
                const end = videoSize - 1;

                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };

                res.writeHead(206, headers);

                const bucket = new mongodb.GridFSBucket(db);
                const downloadStream = bucket.openDownloadStreamByName('787d78b1301a947b6e2b1d8a574f0224.mp4', {
                    start
                });

                // Finally pipe video to response
                downloadStream.pipe(res);
            });
        });
    }
}
    
export default chapterController