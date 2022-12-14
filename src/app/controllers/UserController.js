const userController = {
    login: (req, res) => {
      res.render("auth/login",{
        layout: false
      });
    },
    register: (req,res) => {
        res.render("auth/register", {
          layout: false
        })
      }
  };
  
  export default userController;
  