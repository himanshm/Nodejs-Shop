import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// import adminRoutes from './routes/admin';
// import shopRoutes from './routes/shop';
import { get404Page } from './controllers/error';
import sequelize from './util/database';

const app: Express = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(get404Page);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
