const StudentController = {
  all: (req, res) => {
    res.render('students/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('students/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('students/edit', { layout: 'admin' });
  },
  profile: (req, res) => {
    res.render('students/profile', { layout: 'admin' });
  }
};

export default StudentController;

