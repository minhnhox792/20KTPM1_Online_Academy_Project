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
};

export default DashboardController;
