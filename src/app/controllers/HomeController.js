import Course from "../models/Courses.js";
import ultil from "../../util/mongoose.js"
const HomeController = {
  index: async (req, res) => {
    Course.find({})
    .then(courses =>{
        const top_view = courses.sort((a, b) => a.view - b.view)
        const data_topView = ultil.multipleMongooseToOject(top_view.slice(0, 10))
        
        const top_date = courses.sort((a, b) => a.createdAt - b.createdAt)
        
        const data_topDate = ultil.multipleMongooseToOject(top_date.slice(0, 10));
        
      
        


        res.render("home", {
          data_topView,
          data_topDate
        })
    })
    // const items =[
    //   {
    //     _id: "63973c8913873ec6208bc60d",
    //     name: 'NodeJS',
    //     teacher: 'Ngô Ngọc Đăng Khoa',
    //     numberStudentRate: 0,
    //     description: 'Dạy các kĩ thuật về handlebars và NodejJS',
    //     price: 1500000,
    //     discount: 20,
    //     category: 'Lập trình ứng dụng Web',
    //     view: '255',
    //     createdAt: 2022-12-14,
    //     updatedAt: 2022-12-14
    //   },
    //   {
    //     _id: "63997662d27650ee4924d2f6",
    //     name: 'ReactJS',
    //     teacher: 'Nguyễn Văn Mạnh',
    //     description: 'Khóa học về lập trình web',
    //     price: 250000,
    //     discount: 0,
    //     category: 'Lập trình ứng dụng Web',
    //     numberStudentRate: 0,
    //     view: '869',
    //     createdAt: 2022-12-14,
    //     updatedAt: 2022-12-14
    //   },
    //   {
    //     _id: "6399d6f89c9505c2cc9271c2",
    //     name: 'React Native',
    //     teacher: 'Nguyễn Sanh Tài',
    //     description: 'Đây là khóa học lập trình di động cơ bản',
    //     price: 999999,
    //     discount: 10,
    //     category: 'Lập trình ứng dụng di động',
    //     numberStudentRate: 18,
    //     view: '555',
    //     createdAt: 2022-12-14,
    //     updatedAt: 2022-12-14
    //   }
    // ]
    
    // console.log("Data:" ,items.sort((a, b) => a.view - b.view))
  
  },
};

export default HomeController;
