
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
    required: true,
    unique: true
    
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
      usernameField: 'Email',
      passwordField: 'Password'
    
});

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
//
//
//Account.statics.verifyPassword = function(password, hash, callback) {
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
// 
//
//};
//









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
      
        if(err) return callback(err);
        log.debug(result);
        return callback(null, result);
      
  });
  
    
};

module.exports.Register = Register;




function verifyPassword (password) {
/*
 * получаю пароль
 * беру хеш и соль из базы данных
 * сравниваю значение
 * и возвращаю true || false
 */  
    
    log.info('verifyPassword started');
    
    
    return true;
    
};



module.exports.verifyPassword = verifyPassword;

// export module User



const User = db.model('User', UserSchema);
module.exports.User = User;


//module.exports = db.model('User', UserSchema);






