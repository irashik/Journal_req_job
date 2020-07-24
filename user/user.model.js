
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



const UserSchema = new Schema({
  
  Email: {
    type: String,
    required: true
  },
  Password: {
      type: String,
      required: true
  },
  salt: {
      type: String
      
  },
  Name: {      // имя и фамилия
    type: String
    //required: true
  },
  Position: { // должность.
      type: String
  },
  Departament: {   // цех, участок
      type: String
  }
  
});


const User = db.model('User', UserSchema);



// дальше не правил.


// метод получения всех работников из базы
let FindAllWorker = function(data, error) {
  
      
    // мне на самом деле нужны ли прям все данные???
     
    
    let query = Worker.find({});
    let promise = query.exec();
    
    promise
         .then((doc) => {
                          log.info(doc);
                           data(doc);
                           
        
     })
            .catch((err) => {
                log.error(err);
                error(err);
                
     });
    
    
    
    
    
    
    
    
};

module.exports.FindAllWorker = FindAllWorker;



// создание работника
let WorkerCreate = function(data, callback) {



      const worker = new Worker({ data });
      
    
    // проверяем данные
//    worker.validate()
//            .then(function() {
//                
//                //log.debug("user.validate - ok");
//    })
//            .catch(function(err) {
//                //log.error("user.validate " + err);
//                return callback(err);
//    });



     // сохраняем данные в базе
     worker.save()
            .then(function(doc) {
              //  log.info('mongodb object is saved: ' + doc);
                return(callback('ok'));
                
            })
            .catch(function (err) {
               // log.error(err);
                 return callback(err);
            });    
    
    
    
    
    
    
    
    
    
    

};


module.exports.WorkerCreate = WorkerCreate;





// обновление информации о работнике
let WorkerSaved = function(worker, data, callback, err) {

     const options = { new: true, runValidators: true };


     // обновляем данные в базе
     worker.findOneAndUpdate(worker, data, options)
     
            .then(function(doc) {
                
                 log.debug('mongodb object is update: ' + doc);
         
                 return(callback(doc));
                
            })
            .catch(function (error) {
                
                 log.error(error);

                 return err(error);
            });    
    
    

};



module.exports.WorkerSaved = WorkerSaved;




// получение информации о работнике
let WorkerOpen = function(id, callback, err) {

     const options = { };  //new: true, runValidators: true };


     // обновляем данные в базе
     Worker.findById(id, options)
     
            .then(function(doc) {
                
                 log.debug('mongodb object is find: ' + doc);
         
                 return(callback(doc));
                
            })
            .catch(function (error) {
                
                 log.error(error);

                 return err(error);
            });    
    
    

};



module.exports.WorkerOpen = WorkerOpen;



module.exports.Worker = Worker;
