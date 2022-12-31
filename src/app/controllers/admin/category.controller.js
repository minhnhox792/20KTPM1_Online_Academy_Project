import Category from '../../models/Category.js';
import SubCategory from '../../models/SubCategory.js';

const CategoryController = {
  all: (req, res, next) => {
    res.render('admin/categories/all', { layout: 'admin' });
  },
};

export default CategoryController;
