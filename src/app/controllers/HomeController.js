import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
import Category from '../models/Category.js';
import moment from 'moment';
const HomeController = {
  
  index: async (req, res) => {
    // const all_category = await Category.find({})
    let pageNumber=req.query.pageNumber || 1
    const countPage = Math.floor(await Course.find({isDisable: false}).count()%4)
    let checkpag= false;
    if(pageNumber >= countPage){
      checkpag=true
    }
    const data_caro = await Course.find({isDisable: false}).skip(pageNumber > 0 ? ((pageNumber - 1) * 4) : 0).limit(4)
   
    const top4 = await Course.find({isDisable: false}).sort(({ viewWeekly: -1 })).limit(4)
    Course.find({}).then((courses) => { 
      courses = courses.filter((obj) => {
        return obj.isDisable === false
      }) 
     
      const top_viewWeekly = courses.sort((a, b) => b.viewWeekly - a.viewWeekly);
      const data_viewWeekly = ultil.multipleMongooseToOject(top_viewWeekly.slice(0, 4));
      const top_view = courses.sort((a, b) => b.view - a.view);
      const data_topView = ultil.multipleMongooseToOject(top_view.slice(0, 10));
      const top_date = courses.sort((a, b) => a.createdAt - b.createdAt);
      const data_topDate = ultil.multipleMongooseToOject(top_date.slice(0, 10));
      
      let list_topDate1 = [];
      let list_topDate2 = [];
      let list_topDate3 = [];

      for(var i = 0 ; i < 4 ; i++){
        if(data_topDate[i] !== null){
          list_topDate1.push(data_topDate[i])
        }
      }
      for(var i = 4 ; i < 8 ; i++){
        if(data_topDate[i] !== null){
          list_topDate2.push(data_topDate[i])
        }
      }
      for(var i = 8 ; i < 10; i++){
        if(data_topDate[i] !== null ){
          list_topDate3.push(data_topDate[i])
        }
      }
      list_topDate2 = ultil.filter(list_topDate2)
      list_topDate3 = ultil.filter(list_topDate3)
      list_topDate1 = ultil.filter(list_topDate1)
      
      let list_topView1 = [];
      let list_topView2 = [];
      let list_topView3 = [];

      for(var i = 0 ; i < 4 ; i++){
        if(data_topView[i] !== null){
          list_topView1.push(data_topView[i])
        }
      }
      for(var i = 4 ; i < 8 ; i++){
        if(data_topView[i] !== null){
          list_topView2.push(data_topView[i])
        }
      }
      for(var i = 8 ; i < 10; i++){
        if(data_topView[i] !== null ){
          list_topView3.push(data_topView[i])
        }
      }
      list_topView1 = ultil.filter(list_topView1)
      list_topView2 = ultil.filter(list_topView2)
      list_topView3 = ultil.filter(list_topView3)


      Course.aggregate(
        [
          {
            $group: {
              _id: '$category',

              totalBuy: {
               
                $sum: 
                  { '$toInt': '$quantityBuy' }
                
              }
            }
          }
        ]
      )
      .then(database =>{
        if(database.length != 0){
          console.log(database.length)
          const topCategory = database.sort((a, b) => b.totalBuy - a.totalBuy).slice(0,5)
    
          return res.render('home', {
            list_topView1: ultil.getId(list_topView1),
            list_topView2: ultil.getId(list_topView2),
            list_topView3: ultil.getId(list_topView3),
            list_topDate1: ultil.getId(list_topDate1),
            list_topDate2: ultil.getId(list_topDate2),
            list_topDate3: ultil.getId(list_topDate3),
            data_viewWeekly,
            checkpag,
            topCategory,
            top4,
            pageNumber:pageNumber-"0",
            data_caro,
            auth:req.session.auth,
              });
        }
      })
    });
  },
};

export default HomeController;
