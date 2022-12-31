import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check/index.js";
import UserOTP from "../models/UserOTP.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import sendgridTransport from "nodemailer-sendgrid-transport";
import { request, response } from "express";
import util from "../../util/mongoose.js";
import moment from "moment";
import Course from "../models/Courses.js";
import randomstring from"randomstring"

const ITEM_PER_PAGE = 4;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);


const userController = {
  renderChangePassword: (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/changePassword", {
      error: message,
    });
  },
  changePassword: async (req, res) => {
    try {
      const data = req.body;

      console.log("Data: ", data);
      const id_user = req.session.userInfo._id;
      console.log("Id user: ", id_user);
      const result = await User.findOne({ _id: id_user });

      bcrypt.compare(req.body.current, result.password, (err, dt) => {
        if (err) {
          throw new Error("Failed");
        }
        if (dt) {
          if (data.current === data.new) {
            req.flash("error", "Please input a new password !");

            return res.redirect("/user/changePassword");
          }
          if (data.new !== data.confirm) {
            req.flash(
              "error",
              "New password and confirm password is not match, please check again!"
            );

            return res.redirect("/user/changePassword");
          }
          const salt = bcrypt.genSaltSync(10);

          const hashPass = bcrypt.hashSync(data.new, salt);
          User.updateOne(
            { _id: id_user },
            { $set: { password: hashPass } }
          ).then((kq) => {
            if (!kq) {
              req.flash("error", "Failed, please try again!");

              return res.redirect("/user/changePassword");
            } else {
              return res.redirect("/");
            }
          });
        } else {
          req.flash("error", "Currrent password is invalid!");
          return res.redirect("/user/changePassword");
        }
      });
    } catch {}
  },

  login: (req, res) => {
    res.render("auth/login", {
      layout: false,
    });
  },

  handlLogin: async (req, res) => {
    try {
      console.log(req.headers.referrer);
      if (!req.body.username || !req.body.password) {
        return res.render("auth/login", {
          layout: false,
          err_mess: "Username or Password is empty !!!",
        });
      }

      const UserInput = await User.findOne({ username: req.body.username });
      console.log(UserInput)
      if (!UserInput)
        return res.render("auth/login", {
          layout: false,
          err_mess: "Invalid Username or Password !!!",
        });
      bcrypt.compare(req.body.password, UserInput.password, (err, data) => {
        if (err) throw err;

        //if both match than you can do anything
        if (data) {
          req.session.auth = true;
          req.session.userInfo = UserInput;

          // if(typeof req.session.retUrl === 'undefined'){
          //   res.redirect('/')
          // }
          return res.redirect("/");
        } else {
          return res.render("auth/login", {
            layout: false,
            err_mess: "Invalid Username or Password !!!",
          });
        }
      });
    } catch (err) {
      return res.redirect("login");
    }
  },
  handleLogout: async (req, res) => {
    try {
      console.log("Go log out");
      req.session.auth = false;
      req.session.userInfo = null;
      const url = req.headers.referer || "/";
      res.redirect(url);
    } catch {
      return res.redirect("home");
    }
  },

  register: (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/register", {
      layout: false,
      errorMessage: message,
    });
  },
  getverifyOTP: (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/verifyOTP", {
      layout: false,
      errorMessage: message,
    });
  },
  compareOTP: (req, res) => {
    const OTP = req.body.verifyOTP;
    const username = req.session.userOTP;

    UserOTP.findOne({ username: username }).then((result) => {
      if (result === null) {
        req.flash("error", "OTP number is not exist !");

        return res.redirect("verifyOTP");
      } else {
        var now = moment();
        var date = moment(result.expiresAt)
        if(now > date){
          req.flash("error", "OTP is out of date, please register again !");
          return res.redirect("verifyOTP");
        }
        if (OTP == result.otp) {
          User.updateOne(
            { username: username },
            { $set: { verified: true, actived: true } }
          ).then((data) => {
            return res.redirect("login");
          });
        } else {
          req.flash("error", "OTP number is invalid !");
          return res.redirect("verifyOTP");
        }
      }
    });
  },
  solveRegister: async (req, res) => {
    let hashPass;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/register", {
        layout: false,
        errorMessage: errors.array()[0].msg,
      });
    }
    User.findOne({ username: req.body.username }).then((result) => {
      if (result !== null) {
        req.flash(
          "error",
          "Username exists already, please pick a different one."
        );
        return res.redirect("register");
      } else {
        User.findOne({ email: req.body.email }).then((data) => {
          if (data !== null) {
            req.flash(
              "error",
              "E-Mail exists already, please pick a different one."
            );
            return res.redirect("register");
          } else {
            if (req.body.password !== req.body.passwordConfirmation) {
              req.flash(
                "error",
                "Password and confirmation of password is not matched. Please check again!."
              );
              return res.redirect("register");
            } else {
              const salt = bcrypt.genSaltSync(10);
              hashPass = bcrypt.hashSync(req.body.password, salt);
            }
            const otp = Math.floor(1000 + Math.random() * 9000);
            const info_mail = {
              from: "dangminh7122002@gmail.com",
              to: req.body.email,
              subject: "Verify Your Email",
              html: `<h2>Your OTP number is:</h2>
              <br><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <h3>Please back to verify tab and enter this OTP number into verify input !</h3>`,
            };
            transporter.sendMail(info_mail).then((mess) => {
              if (!mess) {
                return;
              } else {
                console.log("Email sent...", mess);
                const user = new User({
                  username: req.body.username,
                  fullname: req.body.fullname,
                  email: req.body.email,
                  password: hashPass,
                  role: req.body.jobtitle,
                  verified: false,
                });
                const start = Date.now();
                var startdate = moment(start);
                var returned_endate = moment(startdate).add(2, 'hours'); 
                var format_end = returned_endate.format('YYYY-MM-DD HH:mm:ss')
                var format_start = startdate.format('YYYY-MM-DD HH:mm:ss')


                const otp_info = new UserOTP({
                  username: req.body.username,
                  otp: otp,
                  createdAt: format_start,
                  expiresAt: format_end
                });
                const session_username = req.body.username;
                req.session.userOTP = session_username;

                user.save();
                UserOTP.deleteMany({ username: session_username }).then(() => {
                  otp_info.save();
                });

                return res.redirect("verifyOTP");
              }
            });
          }
        });
      }
    });
  },

  renderProfile: async (req, res) => {
    const user = req.session.userInfo;
    if (!user) {
      return res.redirect("/user/login");
    }
    let data = await User.findOne({ _id: user._id });

    const day_format = moment(data.dateOfBirth).format("DD/MM/YYYY").toString();
    const day_joined = moment(data.createdAt).format("DD/MM/YYYY").toString();
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    let courses
    if(user.role=="Lecturer"){
      courses=await Course.find({lecturer:user._id})
    }
    return res.render("user/profile", {
      data: data,
      day_format: day_format,
      day_joined: day_joined,
      error: message,
      courses
    });
  },
  updateProfile: async (req, res) => {
    try {
      const user = req.session.userInfo;
      if (!user) {
        return res.redirect("/user/login");
      }

      const data = req.body;
      if(req.body.gender == "Choose your gender"){
        req.flash("error", "Please choose your gender !")
        return res.redirect('/user/profile')
      }

      console.log("New data: ", data);
      const new_date = util.reFormatDate(data.dob);
      console.log("New date is : ", new_date);
      User.updateOne(
        { _id: user._id },
        {
          $set: {
            fullname: req.body.fullname,
            phone: req.body.phone,
            gender: req.body.gender,
            about: req.body.about,
            dateOfBirth: new_date,
          },
        }
      ).then((result) => {
        if (!result) {
          return res.redirect("/");
        } else {
          return res.redirect("/user/profile");
        }
      });
    } catch {}
  },
  addProduct: async (req, res) => {
    try {
      if (!req.session.userInfo) {
        return res.redirect("/user/login");
      }
      const data = req.session.userInfo;
      const id_user = data._id;
      console.log(data);
      const user = await User.findOne({ _id: id_user });
      if (!user) {
        return res.redirect("/user/register");
      }
      if (user.role !== "Student") {
        return res.redirect("/error/500");
      }
      const id = req.params.id;
      if (user.courseList.includes(id)) {
        return res.redirect("/");
      }
      user.courseList.push(id);
      const updated = await User.updateOne(
        { _id: id_user },
        { $set: { courseList: user.courseList } }
      );
      const course = await Course.find({ _id: id });
      console.log(22222222, course);
      const totalBuy = course[0].totalBuy + 1;
      const quantityBuy = course[0].quantityBuy + 1;
      const list = course[0].studentList;
      console.log("First :", list);

      if (!course[0].studentList.includes(id_user)) {
        course[0].studentList.push(id_user);
      }

      console.log("After :", course[0].studentList);

      const updated_course = await Course.updateOne(
        { _id: id },
        {
          $set: {
            totalBuy: totalBuy,
            quantityBuy: quantityBuy,
            studentList: course[0].studentList,
          },
        }
      );
      console.log("Doneeeeeeeee");
      return res.redirect("/");
    } catch(err) {
      return res.send(err)
    }
  },

  addFavoriteList: async (req, res) => {
    try {
      if (!req.session.userInfo) {
        return res.redirect("/user/login");
      }
      const data = req.session.userInfo;
      const id_user = data._id;
      console.log(data);
      const user = await User.findOne({ _id: id_user });
      if (!user) {
        return res.redirect("/user/register");
      }
      if (user.role !== "Student") {
        return res.redirect("/error/500");
      }
      const id = req.params.id;
      if (user.favoriteList.includes(id)) {
        return res.redirect("/");
      }
      user.favoriteList.push(id);
      const updated = await User.updateOne(
        { _id: id_user },
        { $set: { favoriteList: user.favoriteList } }
      );
      return res.redirect("/");
    } catch {
      return res.redirect("/error/500");
    }
  },

  renderMyCourses: async (req, res) => {
    try {
      if (!req.session.userInfo) {
        return res.redirect("/user/login");
      }
      const data = req.session.userInfo;
      const id_user = data._id;
      const data_user = await User.findOne({ _id: id_user });

      const list_courses = data_user.courseList;
      console.log(list_courses);

      const courses = await Course.find({});

      let new_array = [];
      for (let value of list_courses) {
        const result = courses.filter((item) => {
          return item._id.toString() == value.toString();
        });

        if (result.length != 0) {
          new_array.push(result[0]);
        }
      }

      const page = +req.query.page || 1;
      if (page == null) {
        return;
      }
      let totalItems = new_array.length;

      let page_data = util.paginate(new_array, ITEM_PER_PAGE, page);
      res.render("user/listCourses", {
        data: page_data,
        length: totalItems,
        currentPage: page,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
      });
    } catch {
      return res.redirect("/error/500");
    }
  },
  renderMyFavoriteList: async (req, res) => {
    try {
      if (!req.session.userInfo) {
        return res.redirect("/user/login");
      }
      const data = req.session.userInfo;
      const id_user = data._id;
      const data_user = await User.findOne({ _id: id_user });

      const list_courses = data_user.favoriteList;

      const courses = await Course.find({});

      let new_array = [];
      for (let value of list_courses) {
        const result = courses.filter((item) => {
          return item._id.toString() == value.toString();
        });

        if (result.length != 0) {
          new_array.push(result[0]);
        }
      }
      const page = +req.query.page || 1;
      if (page == null) {
        return;
      }
      let totalItems = new_array.length;

      let page_data = util.paginate(new_array, ITEM_PER_PAGE, page);
      res.render("user/favoriteCourses", {
        data: page_data,
        length: totalItems,
        currentPage: page,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
      });
    } catch {
      return res.redirect("/error/500");
    }
  },


  deleteCourse: async (req, res) => {
    // try {
      const id_course = req.params.id;
      if(!id_course){
        return res.redirect("/error/500");
      }
      console.log("Course id : " , id_course)

      const data = req.session.userInfo;
      const id_user = data._id;

      const findCourse = await User.findOne({_id : id_user})

      console.log("List course: ", findCourse.favoriteList)
      const filtered = findCourse.favoriteList.filter((item) => {
        return item.toString() != id_course.toString();
      })

      const courses = await Course.find({});
      let new_array = [];
      for (let value of filtered) {
        const result = courses.filter((item) => {
          return item._id.toString() == value.toString();
        });

        if (result.length != 0) {
          new_array.push(result[0]);
        }
      }
      console.log("After filter: ",filtered)
      const deletecourse = await User.updateOne(
        { _id: id_user },
        { $set: { favoriteList: filtered } }
      )

      const page = +req.query.page || 1;
      if (page == null) {
        return;
      }
      let totalItems = new_array.length;

      let page_data = util.paginate(new_array, ITEM_PER_PAGE, page);
      res.render("user/favoriteCourses", {
        data: page_data,
        length: totalItems,
        currentPage: page,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
      });
    // } catch {
    //   return res.redirect("/error/500");
    // }
  },
  loginWithGoogle: (req,res) =>{
    
      try{
        console.log(111111111111111)
        
        if(!req.user){
          return res.redirect("/user/login")
        }
        req.session.auth = true;
        req.session.userInfo = req.user;
        return res.redirect('/')
      }
      catch{

      }
  },
  getReset: (req,res) =>{
    
    try{
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/reset", {
        error: message,
      });
  
    }
    catch{

    }
  },
  postReset: async (req,res) => {
    try{
      const user_mail = req.body.email
      const findUser = await User.findOne({email: user_mail})
      if(!findUser){
        req.flash("error", "Email not in any account, please go to register !")
        return res.redirect('/user/reset')
      }
      console.log(findUser)


      const new_password = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      });

      console.log("Newwwwwwwwww: ", new_password)
      const salt = bcrypt.genSaltSync(10);

      const hashPass = bcrypt.hashSync(new_password, salt);
      const info_mail = {
        from: "dangminh7122002@gmail.com",
        to: req.body.email,
        subject: "Reset Your Password",
        html: `<h2>Your new password is:</h2>
        <br><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${new_password}</h2>
        <h3>Please change the password we provide to your personal password !</h3>`,
      };
      transporter.sendMail(info_mail).then((mess) => {
        if (!mess) {
          return;
        } else {
          console.log("Email sent...", mess);
          

          User.updateOne(
            { email: user_mail },
            { $set: { password: hashPass } }
          )
          .then(kq => {
            if(!kq){
              return res.redirect("/error/500")
            }
            console.log("Updated...............")
            return res.redirect('/user/login')
          })
          
        }
      })
    }
    catch{

    }
  }
 
 
};

export default userController;
