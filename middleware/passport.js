'use strict';

/* 
 * Модуль для работы с аутентификацией пользователей
 * */

const log                           = require('../utils/log')(module);
const passport                      = require('passport');
const LocalStrategy                 = require('passport-local');
const bcrypt                        = require('bcrypt');
const User                          = require('../user/user.model');


passport.use(new LocalStrategy ({
    
    usernameField: 'email',
    passwordField: 'password'
    
    
    }, function(username, password, done) {
            
            log.debug('passport Strategy loading = ' + username + '&&' + password);
            
            
            User.User.findOne({ Email: username }, function (err, user) {
                
                if (err) {
                    return done(err);
                }
                if (!user) {
                    log.debug('не сущ. такой аккаунт');
                    return done(null, false, { passport: 'Incorrect username'});
                }
              
                if (!user.validPassword(password)) {
                    
                    log.debug('Incorrect user || password');
                    return done(null, false, { passport: 'Incorrect password'});
                }
                
                log.debug('авторизация пройдена');
                return done(null, user);
                
            });
        }));
        


   //passport.use(new LocalStrategy (User.User.authenticate()));

        
        
        
    passport.serializeUser(User.User.serializeUser());
    passport.deserializeUser(User.User.deserializeUser());
//
//
//passport.serializeUser((user, done) => {
//    
//  done(null, user.id);
//  
//});
//
//
//passport.deserializeUser((id, done) => {
//    
//  User.User.findOne(id)
//          .then((user) => {
//          
//                        done(null, user);
//                        
//        });
//
//});



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