
/*
 * Модуль для взаимодействия с базой данных при работе с пользователями 
 * Пользователи буду подавать заявки (создавать задачи) и просматривать задачи.
 * 
 */

'use strict';

const db                            = require('../utils/mongoose');
const mongoose                      = require('mongoose');
const log                           = require('../utils/log')(module);
const Schema                        = mongoose.Schema;

const bcrypt                        = require('bcrypt');
const passportLocalMongoose         = require('passport-local-mongoose');
const emailservice                  = require('../utils/mailSend');
const util                          = require('util');
const config                        = require('../config');
const ejs                           = require('ejs');
const path                          = require('path');




const UserSchema = new Schema({
  
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
      type: String,
      required: true
  },
  Name: {      // имя и фамилия
    type: String,
    required: true
  },
  Position: { // должность.
      type: String
  },
  Departament: {   // цех, участок
      type: String
  },
  Admin: {
      type: Boolean
  },
  Created: {
      type: Date
  },
  Verifed: {           // переход по ссылке подтверждения
      type: Boolean
  },
  Confirmation: {   // проврка пользователя админом
      type: Boolean
  }
  
  
  
  
});

UserSchema.plugin(passportLocalMongoose, {
      usernameField: 'Email',
      passwordField: 'Password'
    
});

// метод схемы монгуста для проверки пароля
UserSchema.methods.validPassword = function(password) {
    log.info('schema method validPassword run');
    
    let user = this;
    
    if (bcrypt.compareSync(password, user.Password)) { 
        return true;
    } else {
        return false;
    }

};

// подтвержден ли адрес эл. почты пользователя
UserSchema.methods.approvalUser = function() {
    
    log.debug('userschema method approvalUser run');
    
    const user = this;
    
    if (user.Verifed) {
       
        log.debug('user.Verifed ==  true');
        return true;
    } else {
        // todo как сообщение передать??
        log.debug('user.Verifed== false');
        return false;
    }

};

// проверяю подтвержден ли пользователь админом
UserSchema.methods.confirmUser = function() {
    
    const user = this;
    if(user.Confirmation) {
        //return true;
        log.debug('user.Confirmation == true');
        return true;
    } else {
        // todo messages  AuthError
        log.debug('user.Confirmation == false');
        return false;
    }

};



// генерация пароля и возврат хеша  
function setPassword (password) {

        return new Promise((resolve, reject) => {

            // проверяет не пустой ли пароль
            if (!password) { 
                //return callback("empty password", null);
                reject('password empty');
            } 

            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if(err) { 
                    log.error(err);
                    reject(err);
                }
             
                //вычисляем хэш.    
                bcrypt.hash(password, salt)

                    .then(function (hash) {
                        log.debug('pass = ' + hash + ' && salt== ' + salt);
                        
                        //return this.update({ Password: hash });
                        //return callback(null, hash);
                        resolve(hash);

                    })
                    .catch(err => {
                        //return callback(err, null);
                        log.error(err);
                        reject(err);
                    });
                
            });
            
    });
    
};




//todo как его использовать???
// обработчик ошибки авторизации
function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;





// запись данных пользователя в базу данных
function Register(data) {
    
    return new Promise((resolve, reject) => {
        
        /*
         * в аргументе объект с данными пользователя для регистрации
         * создаем модель из объекта
         * отдельно в переменную сохраняем пароль пользователя
         * получаем хеш пароля
         * сохраняем юзера в базе данных
         * 
         * отправляем емейл для подтверждения юзеру.
         * отправляем емейл для проверки админу.
         * 
         */
       
        const passwordUser = data.Password;
        log.info('passwordUser===' + passwordUser);
        log.info('register data==' + JSON.stringify(data));
        
        const user = new User(data);
        
        
    
        // получить hash для пароля 
        let promise = setPassword(passwordUser);
        
        promise
            .then(hash => {
                    // получаем хеш и сохраняем в базе его и сохраняем юзера
                    log.debug('user.Password=== ' + hash);
                    // запишем хеш в модел пользователя
                    // сохраним юзера в базе данных
                    user.Password = hash;
                    return user.save();
                             
                    
            })
            .then(savedUser => {
                // при возврате пользователя сохраненного резолвим.
                log.debug('savedUser=' + savedUser);
                
                // на данном этапе отправляем письма админу и самому пользователю
                
                const admin = SendMailAdmin(savedUser);
                const user =  SendMailUser(savedUser);
                let result = null;
                
                Promise.allSettled([admin, user])
                        
                    .then(res => {
                        result = res;
                        log.debug(res instanceof Array);
                        log.debug('allsettled==' + res);
                        
                    })
                            .catch(err => {
                                log.error('allSettled error= ' + err);
                    })
                    .finally(() => {
                        // возвращаем ответ по обещанию основной функции с юзером 
                        // и результатом отправки (массив)
                        //добавляем в массив данные
//                        log.debug(result instanceof Array);
//                        log.debug('allsettled==' + result);
                        
                        result.unshift(savedUser);
                        
                        // дебагинг
//                        result.forEach(function(item, index, array) {
//                          log.debug(`${item} позицию имеет ${index} в ${array}`);
//
//                        });

                        // возвращаем массив [Юзер, ответ по AdminMail, ответ по UserMail ]
                        resolve(result);
                    
                    });
                
                
                
                
                
                
                
                
                
            })
            .catch(err => {
                    reject(err);
                    
                    
            });
        
    
    
    });
        
    
    
};

module.exports.Register = Register;


/*   Процесс подтверждения регистрации пользователя.
 *
   SendMailUser - это проверка адреса пользователя - verifeUser !!
    SandMailAdmin - это подтверждение пользователя админом - confirmUser!!

*/

// функция для отправки емейла юзеру (проверка по контроллеру userVerife)
function SendMailUser(user) {
      log.info('function sendMailUser start');
      return new Promise((resolve, reject) => {
  
        // объект сообщение для отправки на адрес админа
        let adress = user.Email;
        let url = config.get('url') +':' + config.get('port') + '/register/verife/' +  user._id;
        log.debug('url == ' + url);
        log.warn('object user= ' + user.Email + ' ' + user.Name + ' ' + user.Position + ' ' + user.Departament);
        let way = path.join(__dirname, '..', '/view/password/verife.ejs');
        log.warn(way);
        
        
        // теперь сформировать сообщение
        function html() {
            return new Promise((resolve, reject) => {
                ejs.renderFile(way, { 
                    Email: user.Email, 
                    Name: user.Name, 
                    Position: user.Position, 
                    Departament: user.Departament, 
                    url: url
                }, (err, html) => {
                    if (err) { 
                        //todo как обработать ошибку??
                        log.error(err);
                        throw new Error('create mail confirm error');
                        //return 'Произошла ошибка при формировании письма, обратитесь к админу';
                        reject(err);
                    } 
                        
                        resolve(html);

                });
                
                
                
            });
        };
        
        html()
                .then(result => {
            
                    

                    // формируем письмо для отправки 
                let message = {
                    from: "WebApp JournalReqJob", // sender address
                    to: adress,
                    subject: "Подтвердите свою регистрацию!", // Subject line
                    html: result

                };
                
                return message;
            
        }).then(message => {
            
            
            
              // отправляем сообщение и получаем ответ.    
            emailservice(message)
                 .then(respond => {
                     
                     resolve(respond);

                 })
                 .catch(err => {

                     
                     reject(err);

                 });
            
        });
        
           

        
        
        
        
        
    });
 };
    
    module.exports.SendMailUser = SendMailUser; 

    
    //функция для отправки данных пользователя админу - проверка по контроллеру userConfirm
function SendMailAdmin(user) {
    log.info('function SendMailAdmin start');
    return new Promise((resolve, reject) => {
        
        

        // объект сообщение для отправки на адрес админа
        let adress = config.get('AdminEmail');
        
        
        let url = config.get('url') +':' + config.get('port') + '/register/' + config.get("confirmKey") + '/' +  user._id;
        log.debug('url == ' + url);

        log.warn('object user= ' + user.Email + ' ' + user.Name + ' ' + user.Position + ' ' + user.Departament);


        let way = path.join(__dirname, '..', '/view/password/confirm.ejs');
        
        log.warn(way);
        
        
        // теперь сформировать сообщение
        function html() {
            return new Promise((resolve, reject) => {
                ejs.renderFile(way, { 
                    Email: user.Email, 
                    Name: user.Name, 
                    Position: user.Position, 
                    Departament: user.Departament, 
                    url: url
                }, (err, html) => {
                    if (err) { 
                        //todo как обработать ошибку??
                        log.error(err);
                        throw new Error('create mail confirm error');
                        //return 'Произошла ошибка при формировании письма, обратитесь к админу';
                        reject(err);
                    } 
                        //log.debug('html for mail= ' + html);
                        resolve(html);

                });
                
                
                
            });
        };
        
        html()
                .then(result => {
            
                    

                    // формируем письмо для отправки 
                let message = {
                    from: "WebApp JournalReqJob", // sender address
                    to: adress,
                    subject: "Подтверди нового пользователя!", // Subject line
                    html: result

                };
                
                return message;
            
        }).then(message => {
            
            
            
              // отправляем сообщение и получаем ответ.    
            emailservice(message)
                 .then(respond => {
                     
                     resolve(respond);

                 })
                 .catch(err => {

                     
                     reject(err);

                 });
            
        });
        
           
        
        
        
        
    });
    
};
    

module.exports.SendMailAdmin = SendMailAdmin; 


// проверка почты пользователя пользователя (id как ключ)
function verifeUser(id) {
  
    return new Promise((resolve, reject) => {
        
       /*
        * Ищем user
        *   если найдент то меняем поле verife
        */
       
       let data = {
                    Verifed: true
       };
       
       const option = {new: true };
       
        User.findByIdAndUpdate(id, data, option).exec()
        
            .then(data => {
                resolve(data);

            })
            .catch(err => {
                reject(err);


        });
        
        
    });

};

module.exports.verifeUser = verifeUser;




// подтверждение пользователя админом - функция для проверки пользователя
function confirmUserUpdate(id) {
  
    return new Promise((resolve, reject) => {
        
       /*
        * Ищем user
        *   если найдент то меняем поле verife
        */
       
       let data = {
                    Confirmation: true
       };
       
       const option = { new: true };
       
        User.findByIdAndUpdate(id, data, option).exec()
        
            .then(data => {
                resolve(data);

            })
            .catch(err => {
                reject(err);


        });
        
        
    });

};

module.exports.confirmUserUpdate = confirmUserUpdate;



// обновление профиля пользователя
function UpdateProfile (id, data, callback) {
    
  log.debug('req data' + data);
    let options = { new: true };
    
  
    //найди юзера и обновить данные
    User.findByIdAndUpdate(id, data, options, (err, user) => {
        if(err) return callback(err, null);
        
        log.debug('получено от базы' + user);
        return callback(null, user);
        
        
    });  
  
    
};

module.exports.UpdateProfile = UpdateProfile;





// обновление пароля пользоваетя
function UpdatePassword (id, passw) {
    //найти юзера в базе, обновить его данные и вернуть данные или просто ок или ошибку.
    // сформировать хеш.
    return new Promise((resolve, reject) => {
        log.debug('req data=== ' + JSON.stringify(passw));
        let user = null;
        
    //найди юзера по id
    let promise = User.findById(id).exec();
    
        promise
                .then(olduser => {
                    // уже нашли пользователя
                    // проверяем  пароль юзера на валидность
                    log.debug('получено от базы' + olduser);
                    log.debug('passw===' + passw.OldPassword);
                                       
                    if(olduser.validPassword(passw.OldPassword)) {
                        return olduser;
                    } else {
                        return Promise.reject('user password not valid');
                    }
                    
                })
                .then(data => {
                    // сформируй хеш для юзера
                    user = data; //присваиваем документ базы переменной нелокальной.
                    return setPassword(passw.Password);
                    
                    
                })
                .then(hash => {
                    // получаем хеш и сохраняем в базе его и сохраняем юзера
                    log.debug('user.Password=== ' + hash);
                    //получили хэш и теперь сохраняем его в базе данных к юзеру.
                    user.Password = hash;
                    return user.save();
                    
                            
                })
                .then(user => {
                    // если все хорошо то резолвим результат
                    log.debug('saved user ==' + user);
                    resolve(user);
                    
                })
                .catch(err => {
                    reject(err);
            
                });
        
       
    });
  
    
};

module.exports.UpdatePassword = UpdatePassword;






// export module User
const User = db.model('User', UserSchema);
module.exports.User = User;
//module.exports = db.model('User', UserSchema);

