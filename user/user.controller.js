
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
     
     
     /*
      * получаем данные от view из полей для регистрации
      * передаем в модель для записи в базу данных и создания хеша пароля
      * если запись успешно то редиректим на /login 
      * если ошибка то передаем клиенту ошибку
      * 
      */
     
     
     log.warn(req.body);
         
     let email = req.body.Email;
     let password = req.body.Password;
     let name = req.body.Name;
     let position = req.body.Position;
     let departament = req.body.departament;
     
     const register_data = {
            Email: email,
            Name: name,
            Position: position,
            Departament: departament
            
        };
        
        
     
     
    User.setPassword(password, (hash, salt) => {
        // после того как получен хеш пароля и соль
        // регистрируем пользователя
        // если неудачно то отправляем статус 500 и ошибку
        // если удачно, то редиректим на логин
        
        
        if(hash === true && salt === true) {
            
            register_data.hash = hash;
            register_data.salt = salt;
            
            
              User.Register(register_data, (err, data) => {
            
                    if(err) {
                        log.error(err);

        //                res.render('register', { message: req.flash('error')});
        //                req.flash('error', "неправильные данные");

                        res.status(500).send('ошибка от базы данных ' + err);



                    } else {
                        log.info('успешно');
                        res.status(200).send('запись успешно зарегистрирована' + data);     
                        res.render('/login', { message: 'Вы успешно зарегистрированы'});
                        //res.render('login', { user: req.body.username, message: req.flash('error') });


                    };
            
              });
            
        } else {
            res.status(500).send('ошибка от при генерации хеша ' + hash + '\n' + salt);

        }
    });
        
        
      
     
                          
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

    res.render('/login/profile', {} );
        
    
    
};
