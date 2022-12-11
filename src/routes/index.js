import homeRouter from './home.js';
import courseRouter from './course.js';
import myCoursesRouter from './my-courses.js';
import dashboardRouter from './/dashboard.admin.js';

const route = (app) => {
  app.use('/', homeRouter);
  app.use('/my-courses', myCoursesRouter);
  app.use('/course', courseRouter);
  app.use('/admin', dashboardRouter);
};

export default route;
