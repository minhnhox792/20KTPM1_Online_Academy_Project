import Course from '../models/Courses.js'
const HomeController = {
  index: (req, res) => {
      Course.find({}, (err, courses) => {
        if(!err){
          
        }
        else{
          return res.status(400).json({
            error: 'ERROR !'
          })
        }
      })
      res.render("home")
  },
}


export default HomeController;
