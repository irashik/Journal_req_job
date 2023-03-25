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
                    return done(err, false, { message: 'Error auth' });
                    log.error('error auth');
                }
                if (!user) {
                    log.debug('не сущ. такой аккаунт');
                    return done(null, false, { message: 'Incorrect username'});
                }
              
                if (!user.validPassword(password)) {
                    log.debug('Incorrect user || password');
                    return done(null, false, { message: 'Incorrect password'});
                }
                
                // проверяю подтвержден ли адрес пользователя пользователь
                if(!user.approvalUser) {
                    log.debug('not approvalUser');
                    return done(null, false, { message: 'не подтвержден адрес пользователя' });
                }
                
                // проверяю подтвержден ли пользователь админом
                if(!user.сonfirmUser) {
                    log.debug('not confirm user');
                    return done(null, false, { message: 'не подтвердил администратор' });
                }
 
                log.debug('авторизация пройдена');
                return done(null, user, { message: 'Вы успешно авторизированы'});
                
            });
        }));
        
    passport.serializeUser(User.User.serializeUser());
    passport.deserializeUser(User.User.deserializeUser());


module.exports = passport;