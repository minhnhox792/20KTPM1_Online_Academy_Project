import homeRouter from './home.js';
import courseRouter from './course.js';
import dashboardAdminRouter from './admin/dashboard.admin.js';
import lecturerAdminRouter from './admin/lecturer.admin.js';
import studentAdminRouter from './admin/student.admin.js';
import courseAdminRouter from './admin/course.admin.js';
import categoryAdminRouter from './admin/category.admin.js';
import categoryRouter from './category.js';
import errorRouter from './error.js';
import userRouter from './user.js';
import searchRouter from './search.js';
import chapterRouter from './chapter.js';
export default function (app) {
  app.use(async function (req, res, next) {
    if (typeof req.session.auth === 'undefined') {
      req.session.auth = false;
    }
    if (req.session.auth === false && req.headers.referer!=="http://localhost:3000/user/login") {
      req.session.retUrl =  req.headers.referer;
    }
    res.locals.auth = req.session.auth;
    res.locals.userInfo = req.session.userInfo;
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/course', courseRouter);
    app.use('/admin', dashboardAdminRouter);
    app.use('/admin/lecturer', lecturerAdminRouter);
    app.use('/admin/student', studentAdminRouter);
    app.use('/admin/course', courseAdminRouter);
    app.use('/admin/category', categoryAdminRouter);
    app.use('/category', categoryRouter);
    app.use('/error', errorRouter);
    app.use('/search', searchRouter);
    app.use('/video', chapterRouter);

    app.use((req, res, next) => {
      return res.render('error/404', {
        layout: false,
      });
    });
    
    app.use((err, req, res, next) => {
      return res.render('error/500' , {
        layout: false
      })
    })


    next();
  });
}
