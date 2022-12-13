
const HomeController = {
  
  index: (req, res) => {
      res.render("home", {
        tute:"122321",
        course: {
          name: "abc",
          price: 100,
        }
      })
  },
}


export default HomeController;
