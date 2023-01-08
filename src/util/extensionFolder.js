import express from 'express';
import morgan from 'morgan';
import expressHbs, { engine } from 'express-handlebars';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import * as dotenv from 'dotenv';
// import multer from 'multer';
import hbs_section from 'express-handlebars-sections'
import flash from 'connect-flash'
import session from'express-session'
import nodemailer from "nodemailer";
import numeral from 'numeral'
import asyncErrors from 'express-async-errors'
import passport from 'passport';

export default function(app, path, __dirname) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(flash());


    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride("_method"));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'resource', 'views'));
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
}