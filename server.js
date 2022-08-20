const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./config/passport');
const shortid = require('shortid');

const app = express();

// set handlebars as view engine
app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

// init session mechanism
app.use(session({ secret: shortid.generate() }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// LogIn check middleware
const isLogged = (req, res, next) => {
  if (!req.user) {
    res.redirect('/user-no-permission');
  } else {
    next();
  }
};

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', isLogged, require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user-no-permission', (req, res) => {
  res.render('noPermission');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
