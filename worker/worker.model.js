
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



const WorkerSchema = new Schema({
  
  FirstName: {
    type: String,
    //required: true
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
  status: {            // статус работника???
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


const Worker = db.model('Worker', WorkerSchema);



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
