/*
 * контроллер для обработки запросов аутентификации и авторизации
 * 
 */

'use strict';

const User              = require('./user.model');
const log               = require('../utils/log')(module);



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
     let departament = req.body.Departament;
     let created = new Date();
     
     
     const register_data = {
            Email: email,
            Name: name,
            Position: position,
            Departament: departament,
            Created: created
            
        };
        
        
     
     
    User.setPassword(password, (hash, salt) => {
        // после того как получен хеш пароля и соль
        // регистрируем пользователя
        // если неудачно то отправляем статус 500 и ошибку
        // если удачно, то редиректим на логин
        
        
        if (hash !== null && salt !== null) {
                    
            register_data.Password = hash;
            register_data.salt = salt;
                        
              User.Register(register_data, (err, data) => {
                    if (err) {
                        log.error(err);

        //                res.render('register', { message: req.flash('error')});
        //                req.flash('error', "неправильные данные");

                        res.status(500).send('ошибка от базы данных ' + err);



                    } else {
                        log.info('успешно');
                        
                        log.warn(data);
                        
                        res.status(200).send('запись успешно зарегистрирована' + data);     
                        
                        //res.redirect('login');
                        //, { message: 'Вы успешно зарегистрированы'});
                        
                        //res.render('/login/login', { user: req.body.username, message: req.flash('error') });


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
    
    res.render('login/login', { user: req.user, message: req.flash('message')  });
    
   
                      
};




// Logout
exports.logout = function(req, res) {
     
    log.info('get logout');
    req.logout();
    
   
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
    

    //todo Сбросить пароль и отправить пользователю на емейл новый пароль

    
        
                          
};

// profile view
exports.profile = function(req, res) {
    
    log.info('profile route started');

    res.render('login/profile', { user: req.user } );
        
    
    
};
