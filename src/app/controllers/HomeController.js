import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
const HomeController = {
  
  index: async (req, res) => {
    Course.find({}).then((courses) => {
      const top_view = courses.sort((a, b) => a.view - b.view);
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
      list_topDate3 = ultil.filter(list_topDate2)
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
      return res.render('home', {
        list_topView1,
        list_topView2,
        list_topView3,
        list_topDate1,
        list_topDate2,
        list_topDate3
      });
    });
  },
};

export default HomeController;
