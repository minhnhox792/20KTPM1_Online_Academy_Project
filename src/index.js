import express from "express";
import morgan from "morgan";
import expressHbs, { engine } from "express-handlebars";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import route from "./routes/index.js";
import db from "./config/db/index.js";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/admin/teacher', express.static(path.join(__dirname, 'public')));
app.use('/admin/student', express.static(path.join(__dirname, 'public')));
app.use('/admin/course', express.static(path.join(__dirname, 'public')));

dotenv.config();

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
// app.use(morgan("combined"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
const hbs = expressHbs.create({});

hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
