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
import publicFolder from './util/publicFolder.js'
import extensionFolder from './util/extensionFolder.js'
const hbs = expressHbs.create({});
const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

publicFolder(app, path, __dirname)
app.use(session({  
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
dotenv.config();

connect_database();

extensionFolder(app, path, __dirname)
helpers(hbs)

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
