import User from '../../models/User.js';
import objectFormat from '../../../util/mongoose.js';
import moment from 'moment';
import bcrypt from 'bcryptjs';

const StudentController = {
  all: (req, res, next) => {
    User.find({ role: 'Student' })
      .then((students) => {
        res.render('admin/students/all', {
          layout: 'admin',
          students: objectFormat.multipleMongooseToOject(students),
        });
      })
      .catch(next);
  },
  add: (req, res) => {
    res.render('admin/students/add', { layout: 'admin' });
  },
  storeAdd: async (req, res, next) => {
    const image = req.file;
    const formData = req.body;
    if (image) {
      formData.image = image.filename;
    }
    formData.role = 'Student';
    formData.username = formData.username.replace(/ /g, '');
    const students = await User.find({});
    students.map((student) => {
      if (
        student.username == formData.username ||
        student.email == formData.email
      ) {
        return res.render('admin/students/add', {
          layout: 'admin',
          error: 'Username/Email already exists',
        });
      }
    });
    const rawPassword = formData.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    formData.password = hash;
    const student = new User(formData);
    student
      .save()
      .then(() => {
        res.redirect('/admin/student/all');
      })
      .catch(next);
  },
  edit: (req, res, next) => {
    User.findById(req.params.id)
      .then((student) => {
        student = objectFormat.mongooseToOject(student);
        const temp = student.dateOfBirth.toISOString().split('T')[0];
        student.dateOfBirth = temp;
        res.render('admin/students/edit', {
          layout: 'admin',
          student: student,
        });
      })
      .catch(next);
  },
  storeEdit: (req, res, next) => {
    const image = req.file;
    const formData = req.body;
    if (image) {
      formData.image = image.filename;
    }
    formData.username = formData.username.replace(/ /g, '');
    User.updateOne({ _id: req.params.id }, formData)
      .then(() => {
        res.redirect('/admin/student/all');
      })
      .catch(() => {
        User.find({ role: 'Student' })
          .then((students) => {
            res.render('admin/students/all', {
              layout: 'admin',
              students: objectFormat.multipleMongooseToOject(students),
              error: 'Username/Email already exists',
            });
          })
          .catch(next);
      });
  },
  profile: (req, res, next) => {
    User.findById(req.params.id)
      .then((student) => {
        student = objectFormat.mongooseToOject(student);
        const temp = student.dateOfBirth.toISOString().split('T')[0];
        const dob = moment(temp, 'YYYY-MM-DD').format('DD-MM-YYYY');
        student.dateOfBirth = dob;
        res.render('admin/students/profile', {
          layout: 'admin',
          student: student,
        });
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
  lock: (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { isDisable: true })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
  unlock: (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { isDisable: false })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
};

export default StudentController;
