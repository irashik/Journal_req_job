
/*
 * создаем схему в базе данных
 * получаем данные от контроллера
 * записываем данные в базу данных
 */

'use strict';


const db                            = require('../utils/mongoose');
const mongoose                      = require('mongoose');
const log                           = require('../utils/log')(module);
const Schema                        = mongoose.Schema;



let Worker = new Schema({
  
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String
    
  },
  LastName2: {
    type: String
    
  },
  profession: {
      type: String
  },
  quality: {
      type: Number
  },
  status: {
      type: String
      
  },
  comment: {
      type: String,
      maxlength: 100
  },
  dismissal: {
      type: Date
  }
  
  
});


module.exports = db.model('Worker', Worker);





// очистить базу данных - служебный метод.
let Dropdb  = function() {
         

     Worker.collection.drop(function(err, result) {
         if (err) {
             return err;
             log.error('drop collection err: ' + err);
         }
         log.info('collection droped!' + result);
         result('database is dropped');

     });


    
};





// метод получения всех работников из базы
let FindAllWorker = function(data, status) {
  
  
     // todo
     // мне на самом деле нужны ли прям все данные???
     
    Worker.find({}, function(err, worker) {
        
        if(err) return status(err);
        data(worker);
        
    });
    
};

module.exports.FindAllWorker = FindAllWorker;



// создание работника
let WorkerCreate = function(data, callback) {



      const worker = new Worker({ data });
      
    
    // проверяем данные
    worker.validate()
            .then(function() {
                log.debug("user.validate - ok");
    })
            .catch(function(err) {
                log.error("user.validate " + err);
                return callback(err);
    });



     // сохраняем данные в базе
     worker.save()
            .then(function(doc) {
                log.info('mongodb object is saved: ' + doc);
                return(callback('ok'));
                
            })
            .catch(function (err) {
                log.error(err);
                 return callbacr(err);
            });    
    
    
    

};


module.exports.WorkerCreate = WorkerCreate;