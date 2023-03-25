/*
 * Authentication is Google OAuth
 * 
 */

const log                           = require('../utils/log')(module);
const passport                      = require('passport');
const bcrypt                        = require('bcrypt');
const User                          = require('../user/user.model');
const GoogleStrategy                =require('passport-google-oauth20');



// настройка стратегии Google
//passport.use(new GoogleStrategy({
//    clientID: GOOGLE_CLIENT_ID,
//    clientSecret: GOOGLE_CLIENT_SECRET,
//    callbackURL: "http://www.ptz-cargo/Journal/auth/google/callback"
//},
//    function(accessToken, refreshToken, profile, cb) {
//        User.findOrCreate({ googleId: profile.id }, function (err, user) {
//            return cb(err, user);
//    });
//    }
//));
//



