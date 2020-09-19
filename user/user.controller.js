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
     
     
     const register_data = {
            Email: email,
            Name: name,
            Position: position,
            Departament: departament,
            Created: created
            
        };
        
        
     
       // реализуй этот функционал с помощью промисов а не ада колбэков
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
                        
                        res.status(500).send('ошибка от базы данных ' + err);
                        
                        

                    } else {
                        log.info('успешно');
                        log.warn(data);
                            
                            // todo
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
                            
                            
                        req.flash('message', "Ваша заявка принята");
                        res.status(200).send('запись успешно зарегистрирована' + data);     
                     
                    };
            
              });
            
        } else {
            
            res.status(500).send('ошибка от при генерации хеша пароля ' + hash + '\n' + salt);
            


        }
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
    res.render('login/forgot', { });
    
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
         
     let OldPassword = req.body.OldPassword;
     let NewPassword = req.body.NewPassword;
     let confirmPassword = req.body.confirmPassword;
     let Id = req.user.id
     

    
    
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
                log.info('успешно');
                log.debug(data);

                req.flash('message', "Ваша заявка принята");
                res.status(200).send('запись успешно зарегистрирована' + data);     
                     
            };
            
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
         