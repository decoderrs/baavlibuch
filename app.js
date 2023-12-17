var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

const config = require('./config.js');
var indexRouter = require('./routes/index');

url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log(`Connected correctly to server ${db.connection}`)
}, (err) => console.log(err));

var friendRouter = require('./routes/friendRouter.js');
var contactlogRouter = require('./routes/contactlogRouter.js');
var imageUploadRouter = require('./routes/uploadpicRouter.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://example.com'); // Replace with your allowed origin
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use('/', indexRouter);
app.use('/friend-api', friendRouter);
app.use('', contactlogRouter);
app.use('/imageUpload', imageUploadRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
