import User from '../../models/User.js';

const TeacherController = {
  all: (req, res) => {
    res.render('admin/teachers/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('admin/teachers/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('admin/teachers/edit', { layout: 'admin' });
  },
  profile: (req, res) => {
    res.render('admin/teachers/profile', { layout: 'admin' });
  },
};

export default TeacherController;
