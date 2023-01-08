import Course from '../../models/Courses.js';
import Category from '../../models/Category.js';
import User from '../../models/User.js';
import objectFormat from '../../../util/mongoose.js';
import moment from 'moment';

const CourseController = {
  all: (req, res, next) => {
    Course.find({})
      .then((courses) => {
        res.render('admin/courses/all', {
          layout: 'admin',
          courses: objectFormat.multipleMongooseToOject(courses),
        });
      })
      .catch(next);
  },
  add: async (req, res, next) => {
    Category.find({})
      .then((categories) => {
        User.find({ role: 'Lecturer' })
          .then((lecturers) => {
            res.render('admin/courses/add', {
              layout: 'admin',
              categories: objectFormat.multipleMongooseToOject(categories),
              lecturers: objectFormat.multipleMongooseToOject(lecturers),
            });
          })
          .catch(next);
      })
      .catch(next);
  },
  storeAdd: (req, res, next) => {
    const image = req.file;
    if (!image) {
      Course.find({})
        .then((courses) => {
          res.render('admin/courses/all', {
            layout: 'admin',
            courses: objectFormat.multipleMongooseToOject(courses),
            error: 'Image not found',
          });
        })
        .catch(next);
    }
    const formData = req.body;
    formData.image = image.filename;
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
                      res.redirect('/admin/course/all');
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
  edit: (req, res, next) => {
    Course.findById(req.params.id)
      .then((course) => {
        Category.find({})
          .then((categories) => {
            User.find({ role: 'Lecturer' })
              .then((lecturers) => {
                res.render('admin/courses/edit', {
                  layout: 'admin',
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
            res.redirect('/admin/course/all');
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
                            res.redirect('/admin/course/all');
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
    Course.findById(req.params.id)
      .then((course) => {
        course = objectFormat.mongooseToOject(course);
        const create = course.createdAt.toISOString().split('T')[0];
        const createdAt = moment(create, 'YYYY-MM-DD').format('DD-MM-YYYY');
        course.createdAt = createdAt;

        const update = course.updatedAt.toISOString().split('T')[0];
        const updatedAt = moment(update, 'YYYY-MM-DD').format('DD-MM-YYYY');
        course.updatedAt = updatedAt;
        res.render('admin/courses/about', { layout: 'admin', course: course });
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    Course.findById(req.params.id).then((course) => {
      User.findById(course.lecturer).then((lecturer) => {
        const index = lecturer.courseList.indexOf(course._id);
        lecturer.courseList.splice(index, 1);
        User.updateOne({ _id: lecturer._id }, lecturer)
          .then(() => {
            Course.deleteOne({ _id: req.params.id })
              .then(() => {
                res.redirect('back');
              })
              .catch(next);
          })
          .catch(next);
      });
    });
  },
  lock: (req, res, next) => {
    Course.updateOne({ _id: req.params.id }, { isDisable: true })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
  unlock: (req, res, next) => {
    Course.updateOne({ _id: req.params.id }, { isDisable: false })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
};

export default CourseController;
