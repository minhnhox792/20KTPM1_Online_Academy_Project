import Category from '../../models/Category.js';
import objectFormat from '../../../util/mongoose.js';

const CategoryController = {
  all: (req, res, next) => {
    Category.find({})
      .then((categories) => {
        res.render('admin/categories/all', {
          layout: 'admin',
          categories: objectFormat.multipleMongooseToOject(categories),
        });
      })
      .catch(next);
  },
  add: (req, res, next) => {
    const category = new Category(req.body);
    category
      .save()
      .then(() => {
        res.redirect('/admin/category/all');
      })
      .catch(() => {
        res.redirect('/admin/category/all');
      });
  },
  edit: (req, res, next) => {
    Category.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/admin/category/all');
      })
      .catch(() => {
        res.redirect('/admin/category/all');
      });
  },
  delete: (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  },
  addSub: (req, res, next) => {
    Category.findById(req.params.id)
      .then((category) => {
        category = objectFormat.mongooseToOject(category);
        category.subCategories.push(req.body.subcategory);

        Category.updateOne({ _id: req.params.id }, category)
          .then(() => {
            res.redirect('/admin/category/all');
          })
          .catch(() => {
            res.redirect('/admin/category/all');
          });
      })
      .catch(next);
  },
  deleteSub: (req, res, next) => {
    Category.findById(req.params.id)
      .then((category) => {
        category = objectFormat.mongooseToOject(category);
        const index = category.subCategories.indexOf(req.params.slug);
        category.subCategories.splice(index, 1);

        Category.updateOne({ _id: req.params.id }, category)
          .then(() => {
            res.redirect('/admin/category/all');
          })
          .catch(() => {
            res.redirect('/admin/category/all');
          });
      })
      .catch(next);
  },
};

export default CategoryController;
