import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
const categoryController = {
    view: (req, res) => {
      const category = req.params.id
      console.log(category)

      Course.find({category: category})
      .then(data => {
        res.render("category/viewCourse", {
          auth: req.session.auth,
          data,
          active: 'IT'
        });
      })

      
    },
  }
  
  export default categoryController;
  