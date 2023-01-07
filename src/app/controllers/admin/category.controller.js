import Category from '../../models/Category.js';
import Course from '../../models/Courses.js';
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
        Category.find({})
          .then((categories) => {
            res.render('admin/categories/all', {
              layout: 'admin',
              categories: objectFormat.multipleMongooseToOject(categories),
              error: 'Element already exists',
            });
          })
          .catch(next);
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
    let flag = 1;
    Category.findById(req.params.id).then((category) => {
      Course.find({}).then((courses) => {
        courses = objectFormat.multipleMongooseToOject(courses);
        courses.map((course) => {
          if (course.category == category.category) {
            flag = 0;
            Category.find({})
              .then((categories) => {
                console.log('Hello')
                return res.render('admin/categories/all', {
                  layout: 'admin',
                  categories: objectFormat.multipleMongooseToOject(categories),
                  error: 'This category is used. Can not delete',
                });
              })
              .catch(next);
          }
        });
        if (flag == 1) {
          Category.deleteOne({ _id: req.params.id })
            .then(() => {
              res.redirect('back');
            })
            .catch(next);
        }
      });
    });
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
            Category.find({})
              .then((categories) => {
                res.render('admin/categories/all', {
                  layout: 'admin',
                  categories: objectFormat.multipleMongooseToOject(categories),
                  error: 'Element already exists',
                });
              })
              .catch(next);
          });
      })
      .catch(next);
  },
  deleteSub: (req, res, next) => {
    let flag = 1;
    Course.find({}).then((courses) => {
      courses = objectFormat.multipleMongooseToOject(courses);
      courses.map((course) => {
        if (course.subCategory == req.params.slug) {
          flag = 0;
          Category.find({})
            .then((categories) => {
              return res.render('admin/categories/all', {
                layout: 'admin',
                categories: objectFormat.multipleMongooseToOject(categories),
                error: 'This category is used. Can not delete',
              });
            })
            .catch(next);
        }
      });
      if (flag == 1) {
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
      }
    });
  },
};

export default CategoryController;
