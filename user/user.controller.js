/*
 * контроллер для обработки запросов аутентификации и авторизации
 * сброс пароля, обновление профиля, обновление пароля
 * 
 */

'use strict';

const User              = require('./user.model');
const log               = require('../utils/log')(module);




//  Регистрация пользователя
exports.register = function(req, res) {

    log.info('get register');
    //res.render('login/register', { user: req.user, message: req.flash('message'), warning: req.flash('warning') });
    res.render('login/register', { user: req.user });
                          
};

// Кнопка отправить рег данные - обработчик
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
     
     
     const registerData = {
                Email: email,
                Name: name,
                Position: position,
                Departament: departament,
                Created: created,
                Password: password,
                Admin: false,
                Verifed: false,
                Confirmation: false
        };
        
        //todo можно сделать чтобы данные подтягивались из модели недостающие, чтобы
        // в объекте не прописывать??
        
    // реализуй этот функционал с помощью промисов а не ада колбэков
      
    
        // после того как получен хеш пароля и соль
        // регистрируем пользователя
        // если неудачно то отправляем статус 500 и ошибку
        // если удачно, то редиректим на логин
        
        
        
        let promise = User.Register(registerData);
        
        // от метода модели возвращается массив значений
        
        promise.then(result => {
            log.info('успешно');
                                                       
             log.debug('Данные пользователя= ' + result[0]);
             log.debug('Статус отправки админу= ' + result[1].value);
             log.debug('Статус отправки пользователю: ' + result[2].value);
             

                            
                            
                            
            req.flash('message', "Ваша заявка принята. ");
            req.flash('adminmail', "Статус отправки заявки админу: " + result[1].value);
            req.flash('usermail', "Статус отправки ссылки подтверждения на вашу почту: " + result[2].value);
            
            res.status(200).send();
            
        }).catch(err => {
            log.error(err);
            res.status(500).send(err);
        
        });
           
                        
        
    
                          
};



// Авторизация пользователя
exports.login = function(req, res) {
     
    log.info('get login');
    
    //log.debug('Flash1: ' + req.flash('message'));
    //log.debug('flash2: ' + req.flash('warning'));

    res.render('login/login', { user: req.user, 
                                message: req.flash('message'),
                                warning: req.flash('warning') ,
                                usermail: req.flash('usermail'),
                                adminmail: req.flash('adminmail')
                            
    });
    
                      
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

// forgot password - рендер страницы.
exports.forgot = function(req, res) {
       
    log.info('get forgot');
    res.render('login/forgot', { user: req.user });
    // todo или проверь есть ли юзер и если есть но верни Error404
    
    
};

// Сброс пароля - отправка формы
exports.forgot_post = function(req, res) {
        
    log.info('post forgot');
    
//    
//  - Функционал сброса пароля:
//                1. Пользователь вводит свой емейл и жмет восстановить.
//                2. Сервер ищет пользователя
//                3. Сервер: меняет пароль и отправляет емейл пользователю с паролем
//                4. Пользователь получает пароль, входит и потом меняет пароль на свой 
        // может сделать, чтобы была ссылка и пользователь по переходу на ссылку попадает в свой профиль с необходимостью ввести новый пароль??
       

      /* 
       * возьми емейл из req
       * найди пользователя по емейлу
       * Создай случайный пароль
       * установи новый пароль и запиши в базу изменения
       * отправь емейл с новым паролем на емейл пользователя.
       * 
       * 
       */

    
        
                          
};

// profile view
exports.profile = function(req, res) {
        
    res.render('login/profile', { user: req.user } );
        
};

    // изменение данных профиля пользователя
exports.profileChange = function(req, res) {
    log.info('request path profileChange');
         
     /*
      * получаем данные от view из полей профиля
      * передаем в модель для записи изменений в базу данных
      * отправляем ответ
      * 
      */
     
     
     log.warn(req.body);
         
     let email = req.body.Email;
     let name = req.body.Name;
     let position = req.body.Position;
     let departament = req.body.Departament;
     let id = req.body.Id;
     
     
     
     const profile = {
            Email: email,
            Name: name,
            Position: position,
            Departament: departament
            
            
        };
        
        
     
     
        User.UpdateProfile(id, profile, (err, data) => {
            if (err) {
                log.error(err);
                res.status(500).send(err);

            } else {
                log.debug('данные с сервера' + data);
                res.status(200).send(data);     
                     
            };
            
            });
            
                          
};



    // изменение пароля
exports.changePassw = function(req, res) {
    log.info('post profile');
         
     /*
      * получаем данные от view из полей профиля
      * передаем в модель для записи изменений в базу данных
      * отправляем ответ
      * 
      */
     
     
     
    log.warn(req.body);
    log.warn('id user:: ' + req.user.id);
         
    let oldPassword = req.body.OldPassword;
    let newPassword = req.body.NewPassword;
    const confirmPassword = req.body.ConfirmPassword;
    
    // todo желательно сделать проверку паролей на стороне сервера.
    
    let id = req.user.id;
    if (!id) { req.status(401); }
          
    let password = {
            Password: newPassword,
            OldPassword: oldPassword
        };
        
        
         
    let promise = User.UpdatePassword(id, password);
    
    promise
            .then(data => {
                log.info('успешно');
                res.status(200).send(data);
                
            })
            .catch(err => {
                log.error(err);
                res.status(500).send(err);
                
            });

    
                          
};



    //  проверка адреса почты
exports.userVerife = function(req, res) {
    log.info('get request verife run');
    
    let id = req.params["hash"];
    
    
    /* Ищю пользователя с данным id
     *  если есть, то обновляем поле verife
     *      если true то возвращаем ответ res.send
     */
              
      User.verifeUser(id)
            
            .then(data => {
                  log.debug('new user: ' + data);
                  res.status(200).send('Проверка почты завершена');
                  
                  
                  
      })
      .catch(err => {
            log.error('User.virifeUser return err= ' + err);
            res.status(500).send(err);
      });
              
 
    
    
};
         
         
         
    // подтверждение пользователя администратором.
exports.userConfirm = function(req, res) {
    log.info('get request confirm run');
    
    let id = req.params["hash"];
    
    
    
    /* Ищю пользователя с данным id
     *  если есть, то обновляем поле confirm
     *      если true то возвращаем ответ res.send
     */
              
      User.confirmUserUpdate(id)
            
            .then(data => {
                  log.debug('new user: ' + data);
                  res.status(200).send('Пользователь подтвержден: ' + data);
                  
                  
                  
      })
      .catch(err => {
            log.error('User.confirmUser return err= ' + err);
            res.status(500).send(err);
      });
              
 
    
    
};
         