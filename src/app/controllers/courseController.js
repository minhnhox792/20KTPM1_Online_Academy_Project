import Course from '../models/Courses.js';
const courseController = {
    registerCourse: (req, res) => {
      Course.findById(req.params.id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
          res.render("course/course",{
            course:docs
          });
        }
    });
        
    },
  }
  
  export default courseController;
  