const DashboardController = {
  index: (req, res) => {
    res.render('admin/dashboard', { layout: 'admin' });
  },
};

export default DashboardController;

