
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


const UserSchema = new Schema({
  
  Email: {
    type: String,
    required: true
    
  },
  Password: {
      type: String,
      required: true
  },
  Salt: {
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
  admin: {
      type: Boolean
  },
  created: {
      type: Date
  },
  verify: {
      type: Boolean
  }
  
  
  
});




UserSchema.plugin(passportLocalMongoose, {
   // usernameField: 'email'
    //passwordField: 'passwd'
    
});







//
//
//
//bcrypt.compare(password, user.passwordHash, (err, isValid) => {
//    if (err) {
//        return done(err)
//    }
//    if (!isValid) {
//        return done(null, false);
//    }
//    return done(null, user);
//
//});







//
//
//UserSchema.statics.verifyPassword = function(password, hash, callback) {
//    
//    log.info('verifyPassword start methods');
//    bcrypt.compare(password, hash, function(err, res) {
//
//           if (err) {
//               next(err);
//           }
//          if (res) {
//            log.info('verify password - password true');
//            callback(res);
//          
//          } else {
//            log.info('verify password - password false');
//            callback(res);
//          }
//        
//    });
 

//};











//Account.virtual('password')
//  .set(function(password) {
//    this._plainPassword = password;
//    this.salt = Math.random() + '';
//    this.hashedPassword = this.encryptPassword(password);
//  })
//  .get(function() { return this._plainPassword; });




//Account.methods.encryptPassword = function(password) {
//  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//};





//schema.methods.checkPassword = function(password) {
//  return this.encryptPassword(password) === this.hashedPassword;
//};

//schema.statics.authorize = function(username, password, callback) {
//    var User = this;
//    
//    
//    async.waterfall([
//        function(callback) {
//            User.findOne({username: username}, callback);
//        }, 
//        function(user, callback) {
//            if (user) {
//                if (user.checkPassword(password)) {
//                    callback(null, user);
//                } else {
//                    callback(new AuthError("Пароль неверен"));
//                }
//            } else {
//                var user = new User({username: username, password: password});
//                user.save(function(err) {
//                    if (err) return callback(err);
//                    callback(null, user);
//                });
//            }
//            
//        }
//    ], callback);
//};


//
//
//
//
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
UserSchema.statics.setPassword = function (password, callback) {
    
    log.info("function setPassword is started");
    // берет пароль и генерирует хеш и соль
    
    const saltRounds = 10;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        
        if(err) { 
            log.error(err);
            return callback(err, null);
        
        }
        
        
        log.debug('salt==' + salt);
        
        bcrypt.hash(password, salt)
            
            .then(function (hash) {
                       
                    callback(hash, salt);
                    log.debug('pass = ' + hash + '|||salt==' + salt);
                
                
            })
            
            .catch(err => {
                    callback(err, null);
                    log.error(err);
                    
            });
                        
        
    });
    
    
 };



const User = db.model('User', UserSchema);



// запись данных пользователя в базу данных
function Register (data, callback) {
  
  const user = new User(data);
  
  let promise = User.create(user);
  
  promise
          .then(result => {
              log.debug(result);
              callback(null, result);
  })
          .catch(err => {
                log.error(err);
                callback(err, null);
  });
  
    
    
    
    
    
};


export { Register };








// export module User

//module.exports.User = User;

//module.exports = User;
export { User };
