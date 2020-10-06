var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
//var db = require('./config/db');


const nav = [
  { link: '/home', title: 'Home' },
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
  { link: '/auth/signup', title: 'Register' },
  { link: '/auth/signin', title: 'Sign In' },
  { link: '/logout', title: 'Login/LogOut' }
];

var indexRouter = require('./routes/index')(nav);
var booksRouter = require('./routes/books')(nav);
var adminRouter = require('./routes/admin')(nav);
var authRouter = require('./routes/auth')(nav);

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport
require('./config/passport')(app);


app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
