const MyCoursesController = {
  index: (req, res) => {
    res.render("student/dashboard/learning-carousel", { layout: "user.student.hbs" });
  },
  learning: (req, res) => {
    res.render("student/dashboard/learning-carousel", { layout: "user.student.hbs" });
  },
  lists: (req, res) => {
    res.render("student/dashboard/my-courses-list-carousel", {
      layout: "user.student.hbs",
    });
  },
  watchlist: (req, res) => {
    res.render("student/dashboard/watch-list-carousel", { layout: "user.student.hbs" });
  },
  archived: (req, res) => {
    res.render("student/dashboard/archived-carousel", { layout: "user.student.hbs" });
  },
  profile: (req, res) => {
    res.render("student/profile/profile", { layout: "user.student.hbs" });
  },
};

export default MyCoursesController;
