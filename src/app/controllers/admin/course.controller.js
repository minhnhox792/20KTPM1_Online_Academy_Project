const CourseController = {
  all: (req, res) => {
    res.render('admin/courses/all', { layout: 'admin' });
  },
  add: (req, res) => {
    res.render('admin/courses/add', { layout: 'admin' });
  },
  edit: (req, res) => {
    res.render('admin/courses/edit', { layout: 'admin' });
  },
  about: (req, res) => {
    res.render('admin/courses/about', { layout: 'admin' });
  },
};

export default CourseController;

