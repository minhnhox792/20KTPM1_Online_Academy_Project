const authMiddleware = {
    isAuthenticated: (req,res, next) => {
        if(req.session.auth === false || !req.session.userInfo) {
            return res.render('auth/login', {
                layout: false
            })
        }
        next();
    }
}
  
  
  export default authMiddleware;
  