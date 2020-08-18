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
                    return done(null, false, { message: 'Incorrect username'});
                }
              
                if (!user.validPassword(password)) {
                    
                    log.debug('Incorrect user || password');
                    return done(null, false, { message: 'Incorrect password'});
                }
                
                log.debug('авторизация пройдена');
                return done(null, user, { passport: 'Вы успешно авторизированы'});
                
            });
        }));
        


        
        
        
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

