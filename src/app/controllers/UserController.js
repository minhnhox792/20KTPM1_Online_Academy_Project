import { request } from "express";
import User from "../models/User.js"
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
      },
      handlLogin: async (req,res) => { 
        try {
        if(!req.body.username){
          return res.render("auth/login",{
            layout: false,
            err_mess:'Username is empty !!!',
          })
        }
        const a = await User.findOne({username:req.body.username})
        if(!a) return res.redirect("login")
        if(a.password!==req.body.password) return res.redirect("login",{
          err_mess:'Invalid Username or Password',
        })
        return res.send("Success");
       }
       catch (err){
        console.log(err)
        return res.redirect("login")
       }

      }
    
  };
  
  export default userController;
  