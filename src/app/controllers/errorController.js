import Course from '../models/Courses.js';
const errorController = {
    view: (req, res) => {
        throw new Error('Error Bug!')
    },
  }
  
  export default errorController;
  