
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
  Salt: {            //todo это поле наверное не нужно
      type: String
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
    };

};

// проверка подтверждения пользователя.
UserSchema.methods.approvalUser = function() {
    
    let user = this;
    return true; //todo
    
    // посмотри значение поля Verifed в схеме
    //if (user.Verifed) { return true; };
    
    // еще посмотри поле confirmation
    
};



// метод экземпляра модели
// генерация пароля и возврат хеша и соли      
//    // todo включи эту функцию и удали другую реализацию
UserSchema.statics.setPassword = function (password, callback) {
    
    let user = this;
    
    // берет пароль и генерирует хеш и соль
    if (!password) { return callback(null, null); } 
            
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) { 
            log.error(err);
            callback(err, null);
        }
        
        bcrypt.hash(password, salt)
            
            .then(function (hash) {
                    log.debug('pass = ' + hash + ' && salt== ' + salt);
                    callback(hash, salt);
                    
                
            })
            .catch(err => {
                    callback(err, null);
                    log.error(err);
            });
           
    });
    
    
 };









//Account.virtual('password')
//      .set(function(password) {
//         this._plainPassword = password;
//         this.salt = Math.random() + '';
//         this.hashedPassword = this.encryptPassword(password);
//  })
//      .get(function() { 
//          return this._plainPassword; 
//  });






//// обработчик ошибки авторизации
//function AuthError(message) {
//    Error.apply(this, arguments);
//    Error.captureStackTrace(this, AuthError);
//    
//    this.message = message;
//}
//
//util.inherits(AuthError, Error);
//
//AuthError.prototype.name = 'AuthError';
//
//exports.AuthError = AuthError;








// генерация пароля и возврат хеша и соли
function setPassword (password, callback) {
    // берет пароль и генерирует хеш и соль
    if (!password) { return callback(null, null); } 
    
        
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) { 
            log.error(err);
            callback(err, null);
        }
        
        bcrypt.hash(password, salt)
            
            .then(function (hash) {
                    //log.debug('pass = ' + hash + ' && salt== ' + salt);
                    callback(hash, salt);
                
            })
            .catch(err => {
                    callback(err, null);
                    log.error(err);
            });
           
    });
    
    
 };

module.exports.setPassword = setPassword;


// запись данных пользователя в базу данных
function Register (data, callback) {
    
    const user = new User(data);
  
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
  
  
    //найди юзера
    User.findById(id, (err, user) => {
        
        
        
    });
  
  
//    
//  
//    User.create(user, function (err, result) {
//        if(err) return callback(err, null);
//        
//        log.debug(result);
//        return callback(null, result);
//      
//  });
  
    
};

module.exports.UpdateProfile = UpdateProfile;






// export module User
const User = db.model('User', UserSchema);
module.exports.User = User;
//module.exports = db.model('User', UserSchema);

