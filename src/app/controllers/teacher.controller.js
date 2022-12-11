const TeacherController = {
  all: (req, res) => {
    res.render('teachers/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('teachers/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('teachers/edit', { layout: 'admin' });
  },
  profile: (req, res) => {
    res.render('teachers/profile', { layout: 'admin' });
  },
};

export default TeacherController;

