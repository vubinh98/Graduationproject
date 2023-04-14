var express = require('express');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var app = express();

//const port = 3000;
const cors = require('cors');
const session = require('express-session');

const mongoose = require('mongoose');
var logger = require('morgan')
//const methodOverride = require('method-override')

var indexRouter = require('./routers/index');
var productsRouter = require('./routers/products');
var categoriesRoute = require('./routers/categories');
var apiRouter = require('./routers/api');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
//app.use(methodOverride('_method'))

app.use(session({
    secret: 'myKey',
    resave: true,
    saveUninitialized:true,
    cookie:{secure:false}
  }));
  app.use(cors());
  app.all('/', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

mongoose.connect('mongodb+srv://iFound:2812@cluster0.chha5kj.mongodb.net/database?retryWrites=true&w=majority', {  
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('>>>>>>>>>> DB Connected!!!!!!');
    // app.listen(port, () => {
    //     console.log(`Example app listening on port ${port}`)
    // })
})
.catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRoute);
app.use('/api',apiRouter);

  
app.use(function(req, res, next) {
    next(createError(404));
});
  
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;