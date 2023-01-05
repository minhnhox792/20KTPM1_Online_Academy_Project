import Chapter from '../../models/Chapter.js';
import objectFormat from '../../../util/mongoose.js';

const ChapterController = {
  allOverview: (req, res, next) => {
    res.render('admin/chapters/all', { layout: 'admin' });
  },
  allBasic: (req, res, next) => {
    res.render('admin/chapters/all', { layout: 'admin' });
  },
  allMaster: (req, res, next) => {
    res.render('admin/chapters/all', { layout: 'admin' });
  },
  allAdvanced: (req, res, next) => {
    res.render('admin/chapters/all', { layout: 'admin' });
  },
  add: (req, res, next) => {},
  edit: (req, res, next) => {},
  delete: (req, res, next) => {},
};

export default ChapterController;
