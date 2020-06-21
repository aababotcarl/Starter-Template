// config/auth.js
module.exports = {

    'facebookAuth' : {
        'clientID'        : '113101076757471', // your App ID
        'clientSecret'    : 'e181be46562716d0cad0e38d92ff1125', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'twitterAuth' : {
        'consumerKey'        : 'FIAz26u2jtRkVcsdvAFBZ3UQU',
        'consumerSecret'     : 'fQjus6rVsh02zsRLVcChEkp8kJ8F3L4kkXpmosD3SQq0D9p9RE',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '878834251660-76ao4iqg4vsfgeos7rb7l386vbju76h3.apps.googleusercontent.com',
        'clientSecret'     : '7lhYmzteFZQUKS124q7XNujJ',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
