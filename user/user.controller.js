
/*
 * контроллер для обработки запросов аутентификации и авторизации
 * 
 */

'use strict';

const User          =require('./user.model');
const log             = require('../utils/log')(module);


//  Регистрация пользователя
exports.register = function(req, res) {

    log.info('get register');
     
    res.render('login/register', {  });
     
     
                          
};


exports.register_post = function(req, res) {
     
     log.info('post register');
     
     
     
     
                          
};



// Авторизация пользователя
exports.login = function(req, res) {
     
    log.info('get login');
    
    res.render('login/login', {  });
     
     
                          
};



exports.login_post = function(req, res) {
     
     log.info('posrt login');
     
     
     
     
     
                          
};








// Logout
exports.logout = function(req, res) {
     
    log.info('get logout');
    
       
    
   
    // сессии уже не должно быть. // не самая лучшая реализация.
    req.session.reload(function (err) {
           if (err) return next(err);
       });
       
    res.redirect('/');
    
     
                          
};








// forgot password
exports.forgot = function(req, res) {
        
    log.info('get forgot');
    
    res.render('login/forgot', {  });
    
    
        
                          
};

exports.forgot_post = function(req, res) {
        
    log.info('post forgot');
    
    
    
        
                          
};



// profile view
exports.profile = function(req, res) {
    
    log.info('get profile route started');
     //authenticationMiddleware(),
    res.render('/login/profile', {} );
        
    
    
};
