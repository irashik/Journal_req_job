
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
    
    let user = this;
    
    if (bcrypt.compareSync(password, user.Password)) { 
        return true;
    } else {
        return false;
    }

};

// подтвержден ли адрес эл. почты пользователя
UserSchema.methods.approvalUser = function() {
    
    let user = this;
    return true; //todo
    
    // посмотри значение поля Verifed в схеме
    //if (user.Verifed) { return true; };
    
    // еще посмотри поле confirmation
    
};

// проверяю подтвержден ли пользователь админом
UserSchema.methods.confirmUser = function() {
    
    let user = this;
    return true; //todo
    
    // посмотри значение поля Verifed в схеме
    //if (user.Verifed) { return true; };
    
    // еще посмотри поле confirmation
    
};

// виртуальное поле для схемы - создание соли
//UserSchema.virtual('Salt')
//
//        .get(function() { 
//          
//          const saltRounds = 10;
//            bcrypt.genSalt(saltRounds, function(err, salt) {
//                if(err) { 
//                    log.error(err);
//                    return (err, null);
//                }
//            log.debug('schemavirtual - salt=== ' + salt);
//            //this.salt2 = salt;
//            return salt;
//
//            });
//          
//  });

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
                resolve(savedUser);
                
            })
            .catch(err => {
                    reject(err);
                    
                    
            });
        
    
    
    });
        
    
    
};

module.exports.Register = Register;


/*   Процесс подтверждения регистрации пользователя.
 *
    Создайте случайный хеш и сохраните его в своей базе данных со ссылкой на User ID.
    Отправьте электронное письмо на указанный адрес электронной почты с хешем как часть ссылки, указывающей на маршрут на вашем сервере.
    Когда пользователь щелкает ссылку и попадает в ваш маршрут, проверьте хеш, переданный в URL
    Если хеш существует в базе данных, получите связанного пользователя и установите для его свойства active значение true.
    Удалите хеш из базы, он больше не нужен

*/



    // объект сообщение для отправки на адрес админа
    let adressee = 'D7271984@yandex.ru';
    
    let message = {
        from: '"WebApp JournalReqJob" <D7271984@yandex.ru>', // sender address
        to: adressee,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    };
    
    
    
//    
//// отправляем сообщение и получаем ответ.    
//emailservice(message, (err, respond) => {
//   
//    
//    
//  console.log('sendmail respond::  ' + respond);
//  console.log('error:: ' + err);
//  
//  
//    
//    
//});








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

