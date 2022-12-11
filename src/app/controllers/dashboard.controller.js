const DashboardController = {
  index: (req, res) => {
    res.render('dashboard', { layout: 'admin' });
  },
};

export default DashboardController;

