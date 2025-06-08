var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Routes
const homeRouter = require('./routes/home')
const contactRouter = require('./routes/contacts')
const aboutRouter = require('./routes/about')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", homeRouter)
app.use('/contact', contactRouter)
app.use('/about', aboutRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    title: 'Error',         // ✅ Add this line
    message: err.message,
    error: err
  });
});

module.exports = app;


app.listen (3000, () =>{
  console.log('Server has Started on')
})