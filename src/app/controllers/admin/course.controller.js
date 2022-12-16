import Course from '../../models/Courses.js';
import objectFormat from '../../../util/mongoose.js';

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
  add: (req, res, next) => {
    res.render('admin/courses/add', { layout: 'admin' });
  },
  storeAdd: (req, res, next) => {
    const formData = req.body;
    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.redirect('/admin/course/all');
      })
      .catch(next);
  },
  edit: (req, res, next) => {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('admin/courses/edit', {
          layout: 'admin',
          course: objectFormat.mongooseToOject(course),
        });
      })
      .catch(next);
  },
  storeEdit: (req, res, next) => {
    const formData = req.body;
    formData.updatedAt = Date.now();
    Course.updateOne({ _id: req.params.id }, formData)
      .then(() => {
        res.redirect('/admin/course/all');
      })
      .catch(next);
  },
  about: (req, res, next) => {
    Course.findById(req.params.id)
      .then((course) => {
        course = objectFormat.mongooseToOject(course);
        res.render('admin/courses/about', { layout: 'admin', course });
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
};

export default CourseController;
