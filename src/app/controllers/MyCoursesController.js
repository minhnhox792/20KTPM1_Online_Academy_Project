const MyCoursesController = {
  index: (req, res) => {
    res.render("user/student/learning-carousel");
  },
  learning: (req, res) => {
    res.render("user/student/learning-carousel");
  },
  lists: (req, res) => {
    res.render("user/student/my-courses-list-carousel");
  },
  watchlist: (req, res) => {
    res.render("user/student/watch-list-carousel");
  },
  archived: (req, res) => {
    res.render("user/student/archived-carousel");
  },
  profile: (req, res) => {
    res.render("user/student/profile");
  },
};

export default MyCoursesController;
