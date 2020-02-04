const stripe = require('stripe')("sk_test_8rK2xXnFgnkVJX9yRZ3VVVwW");
const uuidv1 = require('uuid/v1');
const util = require('util');
const path = require('path');
const formidable = require('formidable');
const exec = util.promisify(require('child_process').exec);
const subscriptions = require('../models').Subscription;
const User = require('../models').User;

module.exports = (app, passport) => {

  app.get('/account/signin', (req, res) => {
    res.render('account/signin.ejs');
  });

  app.get('/account/signup', (req, res) => {
      res.render('account/signup.ejs')
  });

  app.post('/account/signup', passport.authenticate('local-signup', {successRedirect: '/account/subscription', failureRedirect: '/account/signup'}));
  app.post('/account/signin', passport.authenticate('local-signin', {successRedirect: '/account/dashboard', failureRedirect: '/account/signin'}));

  app.get('/account/dashboard', isAuthenticated, (req, res) => {
      res.render('account/dashboard', {user: req.user});
  });

  app.get('/account/subscription', isAuthenticated, (req, res) => {
    subscription.findAll({}).then((subscriptions) => {
      res.render('account/subscription', {user: req.user, subscriptions: subscriptions});
    });
  });

  app.post('/account/subscription', isAuthenticated, (req, res) => {
      //This is where we get the subscription and sign the user up for a subscription!!
  });

  app.get('/account/signout', (req, res) => {
    req.session.destroy(function(err){
      res.redirect('/');
    });
  });

  //is user authentication and if so save it in cookies if not redirect!
  function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      console.log('We have reached an error');
    }
  }

  function checkPermission(user)
  {
    if(user.role === 'basic' || user.role === 'pro' || user.role ==='admin'){
      return true;
    }
    return false;
  }



  //run the script
  function runScript(command){
    try{
      exec(command);
    }
    catch(err){
      console.log(err.toString());
    }
  }
};
