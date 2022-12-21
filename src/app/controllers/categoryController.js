import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
const categoryController = {
    view: (req, res) => {
      const category = req.params.id
      

      Course.find({category: category})
      .then(data => {
        
        res.render("category/viewCourse", {
          auth: req.session.auth,
          data: data,
          active: req.params.id,
          length: data.length
        });
      })

      
    },
  }
  
  export default categoryController;
  