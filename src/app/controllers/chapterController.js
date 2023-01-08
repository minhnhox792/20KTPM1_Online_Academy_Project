import Chapter from '../models/Chapter.js';
// import objectFormat from '../../../util/mongoose.js';
import Course from '../models/Courses.js';
import uploadsFiles from '../models/uploads.files.js';
import mongoose from 'mongoose';

const connect = mongoose.createConnection(
    'mongodb+srv://admin:admin@webapp.y5xjsag.mongodb.net/Project_Web_Course?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

let gfs;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads',
    });
});

const chapterController = {
    allOverview: (req, res, next) => {
        const chapterList = [];
        Course.findById(req.params.id)
          .then((course) => {
            console.log(course.overview)
            if (course.overview.length === 0) {
              res.render('course/all', {
                chapterList: chapterList,
                course: 'overview/' + req.params.id,
              });
            } else {
              course.overview.map((chapterId) => {
                Chapter.findById(chapterId)
                  .then((chapter) => {
                    uploadsFiles
                      .findById(chapter.filename)
                      .then((uploads) => {
                        chapterList.push({
                          id: chapter._id,
                          title: chapter.title,
                          filename: uploads.filename,
                        });
                        if (chapterList.length == course.overview.length) {
                          res.render('course/all', {
                   
                            chapterList: chapterList,
                            course: 'overview/' + req.params.id,
                          });
                        }
                      })
                      .catch(next);
                  })
                  .catch(next);
              });
            }
          })
          .catch(next);
      },
      allBasic: (req, res, next) => {
        const chapterList = [];
        Course.findById(req.params.id)
          .then((course) => {
            if (course.basicCode.length === 0) {
              res.render('course/all', {
       
                chapterList: chapterList,
                course: 'basic/' + req.params.id,
              });
            } else {
              course.basicCode.map((chapterId) => {
                Chapter.findById(chapterId)
                  .then((chapter) => {
                    uploadsFiles
                      .findById(chapter.filename)
                      .then((uploads) => {
                        chapterList.push({
                          id: chapter._id,
                          title: chapter.title,
                          filename: uploads.filename,
                        });
                        if (chapterList.length == course.basicCode.length) {
                          res.render('course/all', {
                   
                            chapterList: chapterList,
                            course: 'basic/' + req.params.id,
                          });
                        }
                      })
                      .catch(next);
                  })
                  .catch(next);
              });
            }
          })
          .catch(next);
      },
      allMaster: (req, res, next) => {
        const chapterList = [];
        Course.findById(req.params.id)
          .then((course) => {
            if (course.masterCode.length === 0) {
              res.render('course/all', {
       
                chapterList: chapterList,
                course: 'master/' + req.params.id,
              });
            } else {
              course.masterCode.map((chapterId) => {
                Chapter.findById(chapterId)
                  .then((chapter) => {
                    uploadsFiles
                      .findById(chapter.filename)
                      .then((uploads) => {
                        chapterList.push({
                          id: chapter._id,
                          title: chapter.title,
                          filename: uploads.filename,
                        });
                        if (chapterList.length == course.masterCode.length) {
                          res.render('course/all', {
                   
                            chapterList: chapterList,
                            course: 'master/' + req.params.id,
                          });
                        }
                      })
                      .catch(next);
                  })
                  .catch(next);
              });
            }
          })
          .catch(next);
      },
      allAdvanced: (req, res, next) => {
        const chapterList = [];
        Course.findById(req.params.id)
          .then((course) => {
            if (course.advancedCode.length === 0) {
              res.render('course/all', {
       
                chapterList: chapterList,
                course: 'advanced/' + req.params.id,
              });
            } else {
              course.advancedCode.map((chapterId) => {
                Chapter.findById(chapterId)
                  .then((chapter) => {
                    uploadsFiles
                      .findById(chapter.filename)
                      .then((uploads) => {
                        chapterList.push({
                          id: chapter._id,
                          title: chapter.title,
                          filename: uploads.filename,
                        });
                        if (chapterList.length == course.advancedCode.length) {
                          res.render('course/all', {
                   
                            chapterList: chapterList,
                            course: 'advanced/' + req.params.id,
                          });
                        }
                      })
                      .catch(next);
                  })
                  .catch(next);
              });
            }
          })
          .catch(next);
      },
      addOverview: (req, res, next) => {
        const chapter = new Chapter({
          title: req.body.title,
          filename: req.file.id,
        });
        chapter
          .save()
          .then(() => {
            Course.findById(req.params.id)
              .then((course) => {
                Chapter.findOne({ filename: req.file.id })
                  .then((chapter) => {
                    course.overview.push(chapter._id);
                    Course.updateOne({ _id: req.params.id }, course)
                      .then(() => {
                        res.redirect('back');
                      })
                      .catch(next);
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      },
      addBasic: (req, res, next) => {
        const chapter = new Chapter({
          title: req.body.title,
          filename: req.file.id,
        });
        chapter
          .save()
          .then(() => {
            Course.findById(req.params.id)
              .then((course) => {
                Chapter.findOne({ filename: req.file.id })
                  .then((chapter) => {
                    course.basicCode.push(chapter._id);
                    Course.updateOne({ _id: req.params.id }, course)
                      .then(() => {
                        res.redirect('back');
                      })
                      .catch(next);
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      },
      addMaster: (req, res, next) => {
        const chapter = new Chapter({
          title: req.body.title,
          filename: req.file.id,
        });
        chapter
          .save()
          .then(() => {
            Course.findById(req.params.id)
              .then((course) => {
                Chapter.findOne({ filename: req.file.id })
                  .then((chapter) => {
                    course.masterCode.push(chapter._id);
                    Course.updateOne({ _id: req.params.id }, course)
                      .then(() => {
                        res.redirect('back');
                      })
                      .catch(next);
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      },
      addAdvanced: (req, res, next) => {
        const chapter = new Chapter({
          title: req.body.title,
          filename: req.file.id,
        });
        chapter
          .save()
          .then(() => {
            Course.findById(req.params.id)
              .then((course) => {
                Chapter.findOne({ filename: req.file.id })
                  .then((chapter) => {
                    course.advancedCode.push(chapter._id);
                    Course.updateOne({ _id: req.params.id }, course)
                      .then(() => {
                        res.redirect('back');
                      })
                      .catch(next);
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      },
    edit: (req, res, next) => {
        Chapter.updateOne(
            { _id: req.params.id },
            {
                title: req.body.title,
                filename: req.file.id,
            }
        )
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    },
    deleteOverview: (req, res, next) => {
        Chapter.deleteOne({ _id: req.params.slug })
            .then(() => {
                Course.findById(req.params.id).then((course) => {
                    const index = course.overview.indexOf(req.params.slug);
                    course.overview.splice(index, 1);
                    Course.updateOne({ _id: req.params.id }, course)
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
            })
            .catch(next);
    },
    deleteBasic: (req, res, next) => {
        Chapter.deleteOne({ _id: req.params.slug })
            .then(() => {
                Course.findById(req.params.id).then((course) => {
                    const index = course.basicCode.indexOf(req.params.slug);
                    course.basicCode.splice(index, 1);
                    Course.updateOne({ _id: req.params.id }, course)
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
            })
            .catch(next);
    },
    deleteMaster: (req, res, next) => {
        Chapter.deleteOne({ _id: req.params.slug })
            .then(() => {
                Course.findById(req.params.id).then((course) => {
                    const index = course.masterCode.indexOf(req.params.slug);
                    course.masterCode.splice(index, 1);
                    Course.updateOne({ _id: req.params.id }, course)
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
            })
            .catch(next);
    },
    deleteAdvanced: (req, res, next) => {
        Chapter.deleteOne({ _id: req.params.slug })
            .then(() => {
                Course.findById(req.params.id).then((course) => {
                    const index = course.advancedCode.indexOf(req.params.slug);
                    course.advancedCode.splice(index, 1);
                    Course.updateOne({ _id: req.params.id }, course)
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
            })
            .catch(next);
    },
    video: (req, res, next) => { 
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available ' + req.params.filename,
                });
            }
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
                Connection: 'Keep-Alive',
                'Transfer-encoding': 'chunked',
                'Content-Length': files[0].length,
            });
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    },
    imageRender: (req, res, next) => { 
      gfs.find({ filename: req.params.filename }).toArray((err, files) => {
          if (!files[0] || files.length === 0) {
              return res.status(200).json({
                  success: false,
                  message: 'No files available ' + req.params.filename,
              });
          }
          gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  },

};

export default chapterController;
