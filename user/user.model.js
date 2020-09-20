
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
//  Salt: {            //todo это поле наверное не нужно
//      type: String
//  },
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
    };

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
UserSchema.virtual('salt2')
    .set(function() {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) { 
                log.error(err);
                return (err, null);
            }
        
        this.salt2 = salt;
           
        });
    
    
    }).get(function() { 
        
        return this.salt; 
          
  });

// генерация пароля и возврат хеша  
UserSchema.statics.setPassword = function (password, callback) {
    
    let user = this;
    
    // берет пароль и генерирует хеш и соль
    if (!password) { return callback("empty password", null); } 
            
            
       
    const salt = user.salt();
    
    log.debug('salt::: ' + salt);
        
    bcrypt.hash(password, salt)
            
        .then(function (hash) {
            log.debug('pass = ' + hash + ' && salt== ' + salt);
            callback(hash, salt);
                    
                
        })
        .catch(err => {
            callback(err, null);
            log.error(err);
        });
        
    
    
 };









// обработчик ошибки авторизации
function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;






//
////todo  эту реализацию удали и перейди на ту что выше
//// генерация пароля и возврат хеша и соли
//function setPassword (password, callback) {
//    // берет пароль и генерирует хеш и соль
//    if (!password) { return callback(null, null); } 
//    
//        
//    const saltRounds = 10;
//    bcrypt.genSalt(saltRounds, function(err, salt) {
//        if(err) { 
//            log.error(err);
//            callback(err, null);
//        }
//        
//        bcrypt.hash(password, salt)
//            
//            .then(function (hash) {
//                    //log.debug('pass = ' + hash + ' && salt== ' + salt);
//                    callback(hash, salt);
//                
//            })
//            .catch(err => {
//                    callback(err, null);
//                    log.error(err);
//            });
//           
//    });
//    
//    
// };
//
//module.exports.setPassword = setPassword;


// запись данных пользователя в базу данных
function Register (data, callback) {
    
    const user = new User(data);
    
    // получить hash для пароля
    let hash = user.setPassword(user.Password).exec();
    
    hash
            .then(hash => {
        
        
        
        
        
    })
            .catch(err => {
                
    });
    
    
    
    
    
    
    User.create(user, function (err, result) {
        if(err) return callback(err, null);
        
        log.debug(result);
        return callback(null, result);
      
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
function UpdatePassword (id, password, callback) {
  
    log.debug('req data' + password);
    let options = { new: true };
    
    const newpassword = password.NewPassword;
    const oldPassword = password.OldPassword;
    
  
    /* найти юзера
     * Проверить старый пароль
     * Сформировать хеш и соль нового пароля
     * обновить хеш и соль
     * 
     */
    
    //находим
    let promise = User.findById(id).exec();
    promise.then(user => {
               // проверяю валидность пароля
        if (!user.validPassword(password)) {
            log.debug('Incorrect password');
            return reject;
        }
            
        return user;
                
    })
    .then(validuser => {
        
                
                
                
    })
    .catch(err => {

        
        
                
    });
    
    
    
                
    
   validPassword(oldPassword)
   
     
                
    
    
    User.findByIdAndUpdate(id, newpassw, options, (err, user) => {
        
        if(err) return callback(err, null);
        
        log.debug('получено от базы' + user);
        return callback(null, user);
        
        
    });
  
  
    
};

module.exports.UpdatePassword = UpdatePassword;






// export module User
const User = db.model('User', UserSchema);
module.exports.User = User;
//module.exports = db.model('User', UserSchema);

