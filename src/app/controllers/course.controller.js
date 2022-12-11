const CourseController = {
  all: (req, res) => {
    res.render('courses/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('courses/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('courses/edit', { layout: 'admin' });
  },
  about: (req, res) => {
    res.render('courses/about', { layout: 'admin' });
  },
};

export default CourseController;

