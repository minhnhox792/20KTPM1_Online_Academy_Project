import homeRouter from './home.js';
import courseRouter from './course.js';
import myCoursesRouter from './my-courses.js';

const route = (app) => {
  app.use('/',homeRouter);
  app.use('/my-courses',myCoursesRouter);
  app.use('/course',courseRouter);
};

export default route;
