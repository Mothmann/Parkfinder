require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const { default: AdminBro } = require('admin-bro');
var path = require('path');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var logger = require('morgan');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
var cors = require('cors');
var session = require('express-session')
const rateLimit = require("express-rate-limit");
const options = require('./routes/admin.options');
const buildAdminRouter = require('./routes/admin.router');


paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'Ady83tUxF6eSwVZ7m9lB5ll7FkAK0cqxy3FketIDOFw0Cv4qMCBtywNZlOJPchtIo67CaFuaukVubT5r',
    'client_secret': 'EGeJic3FpglijNhsqk3eF1gXyIVGqx1X037lDz1YdldVD17P1AXvxjwbDE0QshBTof9p9kldjXW8hUSp'
  });

mongoose.connect('mongodb://localhost:27017/parkfinder', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

var indexRouter = require('./routes/index.router');
var userRouter = require("./routes/user.router");
var parkingRouter = require("./routes/parking.router");
var reservationRouter = require("./routes/reservation.router");
//var adminRouter = require("./routes/admin.router");
var paypalRouter = require("./routes/paypal.router");
var scannerRouter = require("./routes/scanner.router");


var app = express();

// view engine setup
const admin = new AdminBro(options);
const router = buildAdminRouter(admin);

app.use(admin.options.rootPath, router);
//app.use('/admin', adminRouter);
app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,// limit each IP to 100 requests per windowMs
    delayMs: 0
});
const oneDay = 1000 * 60 * 60 * 24;

app.use(limiter);
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
app.use(session({
  
  secret: 'x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true , maxAge: oneDay}
}))


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/parking', parkingRouter);
app.use('/reservation', reservationRouter);
app.use('/pay', paypalRouter);
app.use('/scanner' , scannerRouter )

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
  res.status(err.status || 500)
});

module.exports = app;
