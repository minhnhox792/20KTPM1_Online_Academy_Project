import User from '../../models/User.js';

const StudentController = {
  all: (req, res) => {
    res.render('admin/students/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('admin/students/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('admin/students/edit', { layout: 'admin' });
  },
  profile: (req, res) => {
    res.render('admin/students/profile', { layout: 'admin' });
  },
};

export default StudentController;
