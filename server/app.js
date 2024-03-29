var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// websockets
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.set('transports', ['websocket']);
server.listen(8080);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));


// endpoints
var index = require('./endpoints/index/server');
var data = require('./endpoints/data/server');
app.use('/', index);
app.use('/data', data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
