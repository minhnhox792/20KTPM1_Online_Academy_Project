import homeRouter from './home.js';
import courseRouter from './course.js';
import myCoursesRouter from './my-courses.js';
import dashboardAdminRouter from './admin/dashboard.admin.js';
import teacherAdminRouter from './admin/teacher.admin.js';
import studentAdminRouter from './admin/student.admin.js';
import courseAdminRouter from './admin/course.admin.js';

const route = (app) => {
  app.use('/', homeRouter);
  app.use('/my-courses', myCoursesRouter);
  app.use('/course', courseRouter);
  app.use('/admin', dashboardAdminRouter);
  app.use('/admin/teacher', teacherAdminRouter);
  app.use('/admin/student', studentAdminRouter);
  app.use('/admin/course', courseAdminRouter);
};

export default route;
