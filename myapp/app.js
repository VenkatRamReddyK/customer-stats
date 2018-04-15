var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mysql = require("mysql");

var cons = require('consolidate');
var router = express.Router();

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.use('/students', function(){
    // con.query('SELECT * from students', function (error, results, fields) {
    //   console.log(results);
    //   if (error) throw error;
    //   console.log("error from db os ", error);
    //   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    // });
con.connect(function(err) {
  if (err) console.log(err);
});

app.get('/students', function(req, res) {

      //Select only "name" and "address" from "customers":
  con.query("SELECT * from students", function (err, result, fields) {
    console.log(err);
    if (err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
  });

});



// catch 404 and  forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log("error message is ", err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
