import homeRouter from './home.js';
import courseRouter from './course.js';

const route = (app) => {
  app.use('/',homeRouter);
  app.use('/course',courseRouter);
};

export default route;
