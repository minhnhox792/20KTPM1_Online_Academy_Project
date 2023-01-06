import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
import Category from '../models/Category.js';
import { response } from 'express';
const ITEM_PER_PAGE = 3
const categoryController = {
    view: async (req, res) => {
      const all_category = await Category.find({})
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
          lastPage: Math.ceil(totalItems/ITEM_PER_PAGE),
          all_category: all_category

        });
      })
    },
    subCategory: async (req, res) => {
      const subCate = req.params.id
      const categoryMain = await Course.findOne({ subCategory: subCate})
      if(!categoryMain){
        return res.redirect('/')
      }
      const categoryParent = categoryMain.category
      if(!categoryParent){
        return res.redirect('/')
      }
      const data_cate = await Category.findOne({category: categoryParent})
      const all_data = data_cate.subCategories

      const page = +req.query.page || 1;
      if(page == null){
        return;
      }
      let totalItems;
      Course.find({subCategory: subCate})
      .count()
      .then(numProducts => {
        totalItems= numProducts
        return Course.find({subCategory: subCate})
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
      })
     
      .then(data => {
        res.render("category/subCategory", {
          data: data,
          active: req.params.id,
          length: totalItems,
          currentPage : page,
          hasNextPage: ITEM_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems/ITEM_PER_PAGE),
          all_category: all_data,
          nameCategory: categoryParent

        });
      })
    },
    requestSubcatory: async (req, res) => {
      try{
        const parentCategory = req.params.id
        console.log("Parenttttttt: " , parentCategory)
        const data_cate = await Category.findOne({category: parentCategory})
        if(!data_cate){
          return res.redirect('/')
        }
        const all_data = data_cate.subCategories
        console.log("Dataaaaaaaaaaaaaaaaaa: " , all_data)
        const subCate = all_data[0]
       
       
        
        const page = +req.query.page || 1;
        if(page == null){
          return;
        }
        let totalItems;
        Course.find({subCategory: subCate})
        .count()
        .then(numProducts => {
          totalItems= numProducts
          return Course.find({subCategory: subCate})
          .skip((page - 1) * ITEM_PER_PAGE)
          .limit(ITEM_PER_PAGE)
        })
       
        .then(data => {
          res.render("category/subCategory", {
            data: data,
            active: subCate,
            isParent: false,
            length: totalItems,
            currentPage : page,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems/ITEM_PER_PAGE),
            all_category: all_data,
            nameCategory: parentCategory
  
          });
        })
      }
      catch{
        return res.redirect('/error/500')
      }
    },
     
  }
  
  export default categoryController;
  