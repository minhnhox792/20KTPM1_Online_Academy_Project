import Course from '../models/Courses.js';
import User from '../models/User.js';
import Chapter from '../models/Chapter.js';
import uploadsFiles from '../models/uploads.files.js';
// mp3 và mp4 xài chung 1 thư viện

import Category from '../models/Category.js';
import objectFormat from '../../util/mongoose.js';
import moment from 'moment';

const courseController = {
  registerCourse: (req, res) => {
    let ID = req.params.id;
    console.log('ID: ', ID);
    Course.findById(ID, async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        const top5courses = await Course.find()
          .sort({ studentList: -1 })
          .limit(5);
        const lec = await User.findOne({ _id: docs.lecturer });
        // console.log(docs.overview)
        const overview = await Chapter.find({ _id: docs.overview });
        const basicCode = await Chapter.find({ _id: docs.basicCode });
        const advancedCode = await Chapter.find({ _id: docs.advancedCode });
        const masterCode = await Chapter.find({ _id: docs.masterCode });
        const data = req.session.userInfo || [];
        const courseList = await User.findOne({ _id: data._id });
        let isBuy = false;
        try {
          for (let cou of courseList.courseList) {
            if (String(cou) === String(req.params.id)) {
              isBuy = true;
            }
          }
        } catch {}
        let smallDataComment = [];
        smallDataComment.push(docs.comment[0]);
        smallDataComment.push(docs.comment[1]);
        let result_checked = false;
        if (lec?._id !== null) {
          result_checked = lec?._id == data._id;
        }
        if (result_checked === true) {
          isBuy = true;
        }
        res.render('course/course', {
          course: docs,
          course_id: req.params.id,
          smallComment: smallDataComment,
          userdata: data,
          top5courses,
          lec,
          isBuy,
          partcipantd: docs.studentList.length,
          overview,
          basicCode,
          advancedCode,
          masterCode,
          checkedLecture: result_checked,
        });
      }
    });
  },
  pathVideo: async (req, res) => {
    let navigation = req.query.fileid;
    let filevideo = await uploadsFiles.findOne({ _id: navigation });
    let filename = filevideo.filename;
    return res.redirect('/data/video/' + filename);
  },
  commentCourse: async (req, res) => {
    const content = req.body.content || [];
    const course_id = req.query.course_id;
    const rating = req.body.rating || 0;
    const data = req.session.userInfo;
    const course = await Course.findOne({ _id: course_id });

    for (let cou of course.comment) {
      if (String(cou._id) === String(data._id)) {
        return res.redirect('/course/' + course_id);
      }
    }
    if (rating !== 0) {
    let   amount=course.numberStudentRate+1
      const Total =
        (course.comment.length * course.rating + (rating - '0')) /
        (course.comment.length + 1);
      await Course.updateOne(
        { _id: course_id },
        { $set: { rating: Total } },
        {$set:{numberStudentRate:amount}},
      );
    }
    course.comment.push({
      _id: data._id,
      name: data.fullname,
      image:data.image,
      content: content,
      rating: rating,
    });
    const updated = await Course.updateOne(
      { _id: course_id },
      { $set: { comment: course.comment } }
    );
    return res.redirect('/course/' + course_id);
  },
  edit: (req, res, next) => {
    Course.findById(req.params.id)
      .then((course) => {
        Category.find({})
          .then((categories) => {
            User.find({ role: 'Lecturer' })
              .then((lecturers) => {
                res.render('course/edit', {
                  course: objectFormat.mongooseToOject(course),
                  categories: objectFormat.multipleMongooseToOject(categories),
                  lecturers: objectFormat.multipleMongooseToOject(lecturers),
                });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  },
  storeEdit: (req, res, next) => {
    const image = req.file;
    const formData = req.body;
    console.log(image)
    console.log(formData)
    if (image) {
      formData.image = image.filename;
    }
    formData.updatedAt = Date.now();
    const category = formData.category.split('-');
    formData.subCategory = category[0];
    formData.category = category[1];
    Course.findOne({ _id: req.params.id }).then((course) => {
      if (course.lecturer == formData.lecturer) {
        Course.updateOne({ _id: req.params.id }, formData)
          .then(() => {
            res.redirect('/course/' + req.params.id);
          })
          .catch(next);
      } else {
        User.findOne({ _id: course.lecturer })
          .then((lecturer) => {
            const index = lecturer.courseList.indexOf(req.params.id);
            lecturer.courseList.splice(index, 1);
            User.updateOne({ _id: course.lecturer }, lecturer)
              .then(() => {
                User.findById(formData.lecturer)
                  .then((lecturer) => {
                    formData.nameLecturer = lecturer.fullname;
                    lecturer.courseList.push(req.params.id);
                    Course.updateOne({ _id: req.params.id }, formData)
                      .then(() => {
                        User.updateOne({ _id: lecturer._id }, lecturer)
                          .then(() => {
                            res.redirect('/course/' + req.params.id);
                          })
                          .catch(next);
                      })
                      .catch(next);
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      }
    });
  },
  about: (req, res, next) => {
    console.log('IDDDDDDDDDDDD: ', req.params.id);
    Course.findById(req.params.id)
      .then((course) => {
        course = objectFormat.mongooseToOject(course);
        const create = course.createdAt.toISOString().split('T')[0];
        const createdAt = moment(create, 'YYYY-MM-DD').format('DD-MM-YYYY');
        course.createdAt = createdAt;

        const update = course.updatedAt.toISOString().split('T')[0];
        const updatedAt = moment(update, 'YYYY-MM-DD').format('DD-MM-YYYY');
        course.updatedAt = updatedAt;
        res.render('course/about', { course: course });
      })
      .catch(next);
  },
  teacherAdd: (req, res, next) => {
    Category.find({})
      .then((categories) => {
        User.find({ role: 'Lecturer' })
          .then((lecturers) => {
            res.render('course/add', {
              categories: objectFormat.multipleMongooseToOject(categories),
              lecturers: objectFormat.multipleMongooseToOject(lecturers),
            });
          })
          .catch(next);
      })
      .catch(next);
  },
  postAdd: (req, res, next) => {
    const image = req.file;
    if (!image) {
      Course.find({})
        .then((courses) => {
          res.render('course/add', {
            layout: 'admin',
            courses: objectFormat.multipleMongooseToOject(courses),
            error: 'Image not found',
          });
        })
        .catch(next);
    }
    const formData = req.body;
    const temp = req.file.filename;
    formData.image = temp;
    const category = formData.category.split('-');
    formData.subCategory = category[0];
    formData.category = category[1];
    User.findById(formData.lecturer).then((e) => {
      formData.nameLecturer = e.fullname;
      const course = new Course(formData);
      course
        .save()
        .then(() => {
          Course.findOne({ lecturer: e._id, isAdd: false })
            .then((course) => {
              course = objectFormat.mongooseToOject(course);
              course.isAdd = true;
              e.courseList.push(course._id);
              Course.updateOne({ _id: course._id }, course)
                .then(() => {
                  User.updateOne({ _id: e._id }, e)
                    .then(() => {
                      res.redirect('/');
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    });
  },
};
export default courseController;
