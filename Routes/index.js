var homeCtrl = require('../Controllers/home');
var accountCtrl = require('../Controllers/account');
module.exports = function(app, passport){
    
    app.get('/', homeCtrl.home);
    app.get('/account/signup', accountCtrl.signup);
    app.get('/account/signin', accountCtrl.signin);
    app.get('/account/dashboard', isAuthenticated, accountCtrl.dashboard);
    app.post('/account/signin', passport.authenticate('local-signin', {successRedirect: '/account/dashboard', failureRedirect: '/account/signin'}));
    app.post('/account/signup', passport.authenticate('local-signup', {successRedirect: '/account/dashboard', failureRedirect: '/account/signup'}));
    app.get('/account/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
    app.get('/account/facebook/callback', passport.authenticate('facebook', {successRedirect: '/account/dashboard', failureRedirect: '/'}));
    app.get('/account/twitter', passport.authenticate('twitter', {scope: 'email'}));
    app.get('/account/twitter/callback', passport.authenticate('twitter', {successRedirect: '/account/dashboard', failureRedirect: '/'}));
    app.get('/account/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/account/google/callback', passport.authenticate('google', {successRedirect: '/account/dashboard', failureRedirect: '/'}));
        app.get('/account/signout', accountCtrl.signout);
    //check to see if user is authenticated
    function isAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/account/signin');
    }

};

