var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
var passportTwitter = require('../auth/twitter');
var homeCtrl = require('../Controllers/home');
var accountCtrl = require('../Controllers/account');
module.exports = function(app, passport){
    
    app.get('/', homeCtrl.home);
    app.get('/account/signup', accountCtrl.signup);
    app.get('/account/signin', accountCtrl.signin);
    app.get('/account/dashboard', isAuthenticated, accountCtrl.dashboard);
    app.post('/account/signin', passport.authenticate('local-signin', {successRedirect: '/account/dashboard', failureRedirect: '/account/signin'}));
    app.post('/account/signup', passport.authenticate('local-signup', {successRedirect: '/account/dashboard', failureRedirect: '/account/signup'}));
    app.get('/account/facebook', passportFacebook.authenticate('facebook', {failureRedirect: '/account/signin'}));
    app.get('/account/facebook/callback', passportFacebook.authenticate('facebook', {failureRedirect: '/account/signin'}), function(req, res){res.redirect('/account/dashboard')});
    app.get('/account/twitter', passportTwitter.authenticate('twitter'));
    app.get('/account/twitter/callback', passportTwitter.authenticate('twitter', {failureRedirect: '/account/signin'}), function(req, res){res.redirect('/account/dashboard')});
    app.get('/account/google', passportGoogle.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
    app.get('/account/google/callback', passportGoogle.authenticate('google', {failureRedirect: '/account/singin'}), function(req, res){res.redirect('/account/dashboard')});
    app.get('/account/signout', accountCtrl.signout);
    //check to see if user is authenticated
    function isAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/account/signin');
    }

};

