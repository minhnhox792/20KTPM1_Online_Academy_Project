import User from '../../models/User.js';

const TeacherController = {
  all: (req, res) => {
    res.render('admin/lecturers/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('admin/lecturers/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('admin/lecturers/edit', { layout: 'admin' });
  },
  profile: (req, res) => {
    res.render('admin/lecturers/profile', { layout: 'admin' });
  },
};

export default TeacherController;
