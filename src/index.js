import express from 'express';
import morgan from 'morgan';
import expressHbs, { engine } from 'express-handlebars';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import route from './routes/index.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connect_database from './config/db/index.js';
// import multer from 'multer';
import hbs_section from 'express-handlebars-sections'
import flash from 'connect-flash'
import session from'express-session'
import nodemailer from "nodemailer";
import numeral from 'numeral'
import asyncErrors from 'express-async-errors'
import passport from 'passport';
import helpers from './util/helpers.js';
const hbs = expressHbs.create({});
const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/admin/lecturer', express.static(path.join(__dirname, 'public')));
app.use('/admin/lecturer/profile', express.static(path.join(__dirname, 'public')));
app.use('/admin/lecturer/edit', express.static(path.join(__dirname, 'public')));

app.use('/admin/student', express.static(path.join(__dirname, 'public')));
app.use('/admin/student/profile', express.static(path.join(__dirname, 'public')));
app.use('/admin/student/edit', express.static(path.join(__dirname, 'public')));

app.use('/admin/course/about', express.static(path.join(__dirname, 'public')));
app.use('/admin/course/edit', express.static(path.join(__dirname, 'public')));
app.use('/admin/course', express.static(path.join(__dirname, 'public')));

app.use('/admin/category/about', express.static(path.join(__dirname, 'public')));
app.use('/admin/category/edit', express.static(path.join(__dirname, 'public')));
app.use('/admin/category', express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, 'public/assets/css')));
app.use('/images', express.static(path.join(__dirname, 'public/assets/images'))); 
app.use('/vendor', express.static(path.join(__dirname, 'public/vendors/vendor-video'))); 
app.use('/js', express.static(path.join(__dirname, 'assets/js'))); 
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
dotenv.config();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/public/images/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(
//   multer({
//     storage: storage,
//     fileFilter: fileFilter,
//   }).single('image')
// );

dotenv.config();

connect_database();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
// app.use(morgan("combined"));


app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
    section: hbs_section(),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  }),
  // expressHbs({
  //   defaultLayout: "main",
  //   runtimeOptions: {
  //     allowProtoPropertiesByDefault: true,
  //     allowProtoMethodsByDefault: true,
  //   },
  // })
);

helpers(hbs)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));






route(app);




app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
