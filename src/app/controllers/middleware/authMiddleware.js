const authMiddleware = {
  isAuthenticated: (req, res, next) => {
    if (req.session.auth === false || !req.session.userInfo) {
      return res.render('auth/login', {
        layout: false,
      });
    }
    next();
  },
  isAuthenticatedAdmin: (req, res, next) => {
    if (req.session.auth === false || !req.session.userInfo) {
      return res.render('auth/login', {
        layout: false,
      });
    } else {
      if (req.session.userInfo.role === 'Admin') {
        next();
      } else {
        res.render('home');
      }
    }
  },
};

export default authMiddleware;
