'use strict';

/* 
 * Модуль для работы с аутентификацией пользователей
 * */

const log                           = require('../utils/log')(module);
const passport                      = require('passport');
const LocalStrategy                 = require('passport-local');
const bcrypt                        = require('bcrypt');
const User                          = require('../user/user.model');



// образец из сайта passportjs
passport.use(new LocalStrategy ({
    
    usernameField: 'email',
    passwordField: 'passwd'
    
    }, function(username, password, done) {
            
            User.findOne({ Name: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }));
        
        
        
        
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    


module.exports = passport;

//образец из чата.
//
//passport.use('local', new LocalStrategy(function(username, password, done) {
//    
//    Account.findOne({ username: username }, function (err, account) {
//                if (err) { 
//                    log.debug('error' + err);
//                    return done(err); 
//                }
//                if (!account) { 
//                    log.debug('не сущ. такой аккаунт');
//                    return done(null, false, { message: "User not found"});
//                        
//                } else {
//                        
//                        Account.verifyPassword(password, account.password, function(res) {
//                            
//                            if (res) {
//                               return done(null, account, { message: "Hello " + account.username});
//                             } else {
//                                log.debug('Incorrect user || password');
//                                return done(null, false, { message: "Incorrect user || password" }); 
//                             }
//                            
//                        });
//                                 
//                }
//                             
//    });
//
//}));