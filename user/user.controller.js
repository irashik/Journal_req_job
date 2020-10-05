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
                Password: password
            
        };
        
        
        
    // реализуй этот функционал с помощью промисов а не ада колбэков
      
    
        // после того как получен хеш пароля и соль
        // регистрируем пользователя
        // если неудачно то отправляем статус 500 и ошибку
        // если удачно, то редиректим на логин
        
        
        
        let promise = User.Register(registerData);
        
        promise.then(user => {
            log.info('успешно');
            log.warn(user);
                            
                            /*
                             * Здесь нужно отправить емейл пользователю 
                             * Плюс отпавить емейл админу
                             * 
                             */
                            
                            
                            /*   Процесс подтверждения регистрации пользователя.
                             *     Создайте случайный хеш и сохраните его в своей базе данных со ссылкой на User ID.
                                   Отправьте электронное письмо на указанный адрес электронной почты с хешем как часть ссылки, указывающей на маршрут на вашем сервере.
                                   Когда пользователь щелкает ссылку и попадает в ваш маршрут, проверьте хеш, переданный в URL
                                   Если хеш существует в базе данных, получите связанного пользователя и установите для его свойства active значение true.
                                   Удалите хеш из базы, он больше не нужен

                               */
                            
                            
            req.flash('message', "Ваша заявка принята. На вашу почту отправлено письмо для подтверждения регистрации");
            res.status(200).send(user);     
            
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

    res.render('login/login', { user: req.user, message: req.flash('message'), warning: req.flash('warning') });
    
                      
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
    

    //todo Сбросить пароль и отправить пользователю на емейл новый пароль
      /* 
       * возьми емейл из req
       * найди пользователя по емейлу
       * Создай случайный пароль
       * установи новый пароль и запиши в базу изменения
       * отправь емейл с новым паролем на емейл пользователя.
       * 
       * @param {type} req
       * @param {type} res
       * @returns {undefined}
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
    let confirmPassword = req.body.ConfirmPassword;
    
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
exports.verife = function(req, res) {
    log.info('get request verife run');
    
    let hash = req.params["hash"];
    
    
 
    
    
};
         
         
         
    // подтверждение пользователя администратором.
exports.confirm = function(req, res) {
    log.info('get request confirm run');
    
    let hash = req.params["hash"];
    
    
    
 
    
    
};
         