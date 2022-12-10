import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';


const PORT = 3000;

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(morgan('combined'));
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(PORT, () =>
  console.log(`Online Academy Admin app listening at http://localhost:${PORT}`)
);
