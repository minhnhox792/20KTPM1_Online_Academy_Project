import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
const ITEM_PER_PAGE = 1
const categoryController = {
    view: (req, res) => {
      const category = req.params.id
      const page = +req.query.page || 1;
      if(page == null){
        return;
      }
      let totalItems;
      Course.find({category: category})
      .count()
      .then(numProducts => {
        totalItems= numProducts
        return Course.find({category: category})
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
      })
     
      .then(data => {
        res.render("category/viewCourse", {
          data: data,
          active: req.params.id,
          length: totalItems,
          currentPage : page,
          hasNextPage: ITEM_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems/ITEM_PER_PAGE)

        });
      })
    },
  }
  
  export default categoryController;
  