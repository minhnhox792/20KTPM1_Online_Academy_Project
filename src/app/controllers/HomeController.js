import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
const HomeController = {
  index: async (req, res) => {
    Course.find({}).then((courses) => {
      const top_view = courses.sort((a, b) => a.view - b.view);
      const data_topView = ultil.multipleMongooseToOject(top_view.slice(0, 10));

      const top_date = courses.sort((a, b) => a.createdAt - b.createdAt);

      const data_topDate = ultil.multipleMongooseToOject(top_date.slice(0, 10));
      res.render('home', {
        data_topView,
        data_topDate,
        auth : req.session.auth,
      });
    });
  },
};

export default HomeController;
