import dashboardRouter from './dashboard.route.js';

const route = (app) => {
  app.use('/', dashboardRouter);
};

export default route;
