import homeRouter from "./home.js";
import courseRouter from "./course.js";
import myCoursesRouter from "./user/student/my-courses.js";
import dashboardAdminRouter from "./admin/dashboard.admin.js";
import lecturerAdminRouter from "./admin/lecturer.admin.js";
import studentAdminRouter from "./admin/student.admin.js";
import courseAdminRouter from "./admin/course.admin.js";
import categoryRouter from "./category.js";
import errorRouter from "./error.js";
import userRouter from "./user/auth.js";

export default function (app){
  app.use(async function (req, res, next) {
    if (typeof req.session.auth === 'undefined') {
      req.session.auth = false;
    }
    res.locals.auth = req.session.auth;
    app.use("/", homeRouter);
    app.use("/user", userRouter);
    app.use("/my-courses", myCoursesRouter);
    app.use("/course", courseRouter);
    app.use("/admin", dashboardAdminRouter);
    app.use("/admin/lecturer", lecturerAdminRouter);
    app.use("/admin/student", studentAdminRouter);
    app.use("/admin/course", courseAdminRouter);
    app.use("/category",categoryRouter);
    app.use("/error", errorRouter);
    
    app.use((req,res,next) => {
      return res.render('error/404' , {
        layout: false
      })
    });
    
    app.use((err, req, res, next) => {
      return res.render('error/500' , {
        layout: false
      })
    })



    next();
  });
}