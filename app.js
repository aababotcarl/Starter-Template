const express    = require('express');
const app        = express();
const passport   = require('passport');
const session    = require('express-session');
const connRoles = require('connect-roles');
const expressvalidator = require('express-validator');
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const env        = require('dotenv').config();


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // For Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// middleware to make 'user' available to all templates
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});

// view engine && public dir setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//epxress layout templates
app.use(expressLayouts);

// home
app.get('/', function(req, res){
res.render('home/index.ejs');
});


//Models
const models = require("./models");

//load passport strategies
require('./config/passport.js')(passport, models.User);

//Routes
const account = require('./controllers/account.js')(app,passport);



//Sync Database
models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!")
});

app.listen(3000, function(err){
  if(!err)
  console.log("Site is live"); else console.log(err)
});
