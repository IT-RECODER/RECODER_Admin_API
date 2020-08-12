const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig(passport);

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', userRouter);
app.use('/main', mainRouter);
app.use('/admin', adminRouter);

app.listen(5000, () => {
  console.log('실행중 http://localhost:5000/');
});
