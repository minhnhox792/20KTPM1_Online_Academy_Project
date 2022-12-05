class NewsController {
  index(req, res) {
    res.render('home');
  }
}

export default new NewsController();
