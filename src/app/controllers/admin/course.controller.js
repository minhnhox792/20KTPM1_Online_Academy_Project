import Course from '../../models/Courses.js';
import objectFormat from '../../../util/mongoose.js';

const CourseController = {
  all: (req, res, next) => {
    Course.find({})
      .then((courses) => {
        courses = objectFormat.multipleMongooseToOject(courses);
        res.render('admin/courses/all', { layout: 'admin', courses });
      })
      .catch(next);
  },
  add: (req, res, next) => {
    res.render('admin/courses/add', { layout: 'admin' });
  },
  store: (req, res, next) => {
    const formData = req.body;
    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.render('admin/courses/store', { layout: 'admin' });
      })
      .catch(next);
  },
  edit: (req, res) => {
    res.render('admin/courses/edit', { layout: 'admin' });
  },
  about: (req, res, next) => {
    Course.findById(req.params.id)
      .then((course) => {
        course = objectFormat.mongooseToOject(course);
        res.render('admin/courses/about', { layout: 'admin', course });
      })
      .catch(next);
  },
};

export default CourseController;
