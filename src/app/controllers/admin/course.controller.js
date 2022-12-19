import Course from '../../models/Courses.js';
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
  add: (req, res, next) => {
    res.render('admin/courses/add', { layout: 'admin' });
  },
  storeAdd: (req, res, next) => {
    const image = req.file;
    if (!image) {
      return res.status(422).render('admin/courses/add', {
        layout: 'admin',
        pageTitle: 'Admin',
        path: '/admin/course/add',
        editing: false,
        hasError: true,
        errorMessage: 'Attached file is not an image.',
        validationErrors: [],
      });
    }
    const formData = req.body;
    const temp = req.file.path;
    formData.image = temp.replace(/src\\public/g, '');
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
    const image = req.file;
    if (!image) {
      return res.status(422).render('admin/courses/edit', {
        layout: 'admin',
        pageTitle: 'Admin',
        path: `/admin/course/edit/{req.params.id}`,
        editing: false,
        hasError: true,
        errorMessage: 'Attached file is not an image.',
        validationErrors: [],
      });
    }
    const formData = req.body;
    const temp = req.file.path;
    formData.image = temp.replace(/src\\public/g, '');
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
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
};

export default CourseController;
