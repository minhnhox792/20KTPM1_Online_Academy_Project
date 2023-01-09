import User from '../../models/User.js';

const DashboardController = {
  index: (req, res) => {
    res.render('admin/dashboard', { layout: 'admin' });
  },
  logout: async (req, res) => {
    try {
      req.session.auth = false;
      req.session.userInfo = null;
      const url = req.headers.referer || '/';
      res.redirect(url);
    } catch {
      return res.redirect('home');
    }
  },
  profile: (req, res, next) => {
    res.render('admin/profile', { layout: 'admin' });
  },
  edit: (req, res, next) => {
    res.render('admin/edit', { layout: 'admin' });
  },
  storeEdit: (req, res, next) => {
    console.log(req.session.userInfo);
    const image = req.file;
    const formData = req.body;
    if (image) {
      formData.image = image.filename;
    }
    formData.username = formData.username.replace(/ /g, '');
    console.log(formData);
    User.updateOne({ _id: req.session.userInfo._id }, formData)
      .then(() => {
        res.redirect('/admin/profile');
      })
      .catch(() => {
        res.render('admin/edit', {
          layout: 'admin',
          error: 'Username/Email already exists',
        });
      });
  },
};

export default DashboardController;
