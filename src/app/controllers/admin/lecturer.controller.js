import User from '../../models/User.js';
import Course from '../../models/Courses.js';
import objectFormat from '../../../util/mongoose.js';
import moment from 'moment';
import bcrypt from 'bcryptjs';

const LecturerController = {
  all: (req, res, next) => {
    User.find({ role: 'Lecturer' })
      .then((lecturers) => {
        res.render('admin/lecturers/all', {
          layout: 'admin',
          lecturers: objectFormat.multipleMongooseToOject(lecturers),
        });
      })
      .catch(next);
  },
  add: (req, res) => {
    res.render('admin/lecturers/add', { layout: 'admin' });
  },
  storeAdd: async (req, res, next) => {
    const image = req.file;
    const formData = req.body;
    if (image) {
      formData.image = image.filename;
    }
    formData.role = 'Lecturer';
    formData.username = formData.username.replace(/ /g, '');
    const lecturers = await User.find({});
    lecturers.map((lecturer) => {
      if (
        lecturer.username == formData.username ||
        lecturer.email == formData.email
      ) {
        return res.render('admin/lecturers/add', {
          layout: 'admin',
          error: 'Username/Email already exists',
        });
      }
    });
    const rawPassword = formData.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    formData.password = hash;
    const lecturer = new User(formData);
    lecturer
      .save()
      .then(() => {
        res.redirect('/admin/lecturer/all');
      })
      .catch(next);
  },
  edit: (req, res, next) => {
    User.findById(req.params.id)
      .then((lecturer) => {
        lecturer = objectFormat.mongooseToOject(lecturer);
        const temp = lecturer.dateOfBirth.toISOString().split('T')[0];
        lecturer.dateOfBirth = temp;
        res.render('admin/lecturers/edit', {
          layout: 'admin',
          lecturer: lecturer,
        });
      })
      .catch(next);
  },
  storeEdit: async (req, res, next) => {
    const image = req.file;
    const formData = req.body;
    if (image) {
      formData.image = image.filename;
    }
    formData.username = formData.username.replace(/ /g, '');
    User.updateOne({ _id: req.params.id }, formData)
      .then(() => {
        res.redirect('/admin/lecturer/all');
      })
      .catch(() => {
        User.find({ role: 'Lecturer' })
          .then((lecturers) => {
            res.render('admin/lecturers/all', {
              layout: 'admin',
              lecturers: objectFormat.multipleMongooseToOject(lecturers),
              error: 'Username/Email already exists',
            });
          })
          .catch(next);
      });
  },
  profile: (req, res, next) => {
    User.findById(req.params.id)
      .then((lecturer) => {
        lecturer = objectFormat.mongooseToOject(lecturer);
        const temp = lecturer.dateOfBirth.toISOString().split('T')[0];
        const dob = moment(temp, 'YYYY-MM-DD').format('DD-MM-YYYY');
        lecturer.dateOfBirth = dob;
        res.render('admin/lecturers/profile', {
          layout: 'admin',
          lecturer: lecturer,
        });
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    User.findById(req.params.id).then((lecturer) => {
      if (lecturer.courseList.length > 0) {
        User.find({ role: 'Lecturer' })
          .then((lecturers) => {
            res.render('admin/lecturers/all', {
              layout: 'admin',
              lecturers: objectFormat.multipleMongooseToOject(lecturers),
              error: 'The lecturer has (a) course(s). Can not delete',
            });
          })
          .catch(next);
      } else {
        User.deleteOne({ _id: req.params.id })
          .then(() => {
            res.redirect('back');
          })
          .catch(next);
      }
    });
  },
  lock: (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { isDisable: true })
      .then(() => {
        Course.updateMany({ lecturer: req.params.id }, { isDisable: true })
          .then(() => {
            res.redirect('back');
          })
          .catch(next);
      })
      .catch(next);
  },
  unlock: (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { isDisable: false })
      .then(() => {
        Course.updateMany({ lecturer: req.params.id }, { isDisable: false })
          .then(() => {
            res.redirect('back');
          })
          .catch(next);
      })
      .catch(next);
  },
};

export default LecturerController;
