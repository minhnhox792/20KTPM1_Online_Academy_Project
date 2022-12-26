import User from '../../models/User.js';
import objectFormat from '../../../util/mongoose.js';
import moment from 'moment';

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
    if (!image) {
      return res.status(404).render('admin/students/add', {
        layout: 'admin',
        pageTitle: 'Admin',
        path: `/admin/student/add`,
        editing: false,
        hasError: true,
        errorMessage: 'Attached file is not an image.',
        validationErrors: [],
      });
    }
    const students = await User.find({});
    students.map((student) => {
      if (
        student.username == formData.username ||
        student.email == formData.email
      ) {
        return res.status(404).render('admin/students/add', {
          layout: 'admin',
          pageTitle: 'Admin',
          path: `/admin/student/add`,
          editing: false,
          hasError: true,
          errorMessage: 'Attached file is not an image.',
          validationErrors: [],
        });
      }
    });
    const temp = req.file.path;
    formData.image = temp.replace(/src\\public/g, '');
    formData.role = 'Student';
    formData.username = formData.username.replace(/ /g, '');
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
    if (!image) {
      return res.status(422).render('admin/students/edit', {
        layout: 'admin',
        pageTitle: 'Admin',
        path: `/admin/students/edit/{req.params.id}`,
        editing: false,
        hasError: true,
        lecturer: req.body,
        errorMessage: 'Attached file is not an image.',
        validationErrors: [],
      });
    }
    const formData = req.body;
    const temp = req.file.path;
    formData.username = formData.username.replace(/ /g, '');
    formData.image = temp.replace(/src\\public/g, '');
    formData.updateAt = Date.now();
    User.updateOne({ _id: req.params.id }, formData)
      .then(() => {
        res.redirect('/admin/student/all');
      })
      .catch(next);
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
};

export default StudentController;
