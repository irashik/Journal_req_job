/*
 * класс реализует работу с базой данных в части задач
 * запись в базу денных
 * создание схемы
 * 
 * внесение изменений в базу данных
 * 
 * нужен метод которы реализиует сортировку и фильтрацию.
 */
'use strrict';



const db                            = require('../utils/mongoose');
const mongoose                      = require('mongoose');
const log                           = require('../utils/log')(module);
let Schema                          = mongoose.Schema;



const chai             = require('chai');
const assert           = chai.assert;


let TaskSchema = new Schema({
  
  Name: {          // имя задачи - краткое описание.
    type: String,
    required: true,
    maxlength: 300
  },
  Description: {  // более подробное описание задачи
    type: String,
    maxlength: 1000
  },
  DateStart: {     // дата создания задачи
    type: Date
  },
  Status: {     // статус задачи [активная, в процессе, завершена (закрыта closed), отложена, заявка, выполнена, ]
      type: String,
      default: "Активная"
  },
  DateEnd: {      // дата выполнения
      type: Date
  },
  Responsible: {  // ответственный работник 
      type: String,
      default: 'бригадир Ирашин'
  },
  Priority: {   // приоритет срочное важное, несрочное важное, срочное неважное, несрочное неважное
      type: String
  },
  TypeTask: {  // тип задачи (хоз.раб; срочный ремонт, ремонт, обслуживание, ремонт Локомот, ппр, план ОГМ ??).
      type: String
  },
  Creator: {   // создатель задачи (автор). 
      // тут ссылка на id коллекции из пользователей
      type: String   
  },
  Profession: {  // профессия для которой задача
      type: String
  },
  Foto: {
      type: String // нужно тип binData но чет незнаю
  },
  Resource: {    // требуемые ресурсы (материалы)
      type: String
  },
  ExpenseTime: {  // затраты времени на задачу
      type: String 
  }
             
});


const Task = db.model('Task', TaskSchema);



//todo подумай над реализацие очередности задач (список задач сначало это потом то, затем...)


function TaskCreate(data, callback) {
    // создай запись в базе данных, и верни подтверждение
    
      //log.debug(JSON.stringify(data));
      //log.debug(JSON.parse(data));
      log.debug(data);
            
      
    const task = new Task(data);
     
            // {       
            //         Name: 
            //         Description:
            //         DateStart: 
            //         Status: 
            //         DateEnd: 
            //         Responsible: {  // ответственный работник 
            //         Priority: 
            //         TypeTask: {  // тип задачи (хоз.раб; срочный ремонт, ремонт, обслуживание, ремонт Локомот, ппр, план ОГМ ??).
            //         Creator: {   // создатель задачи (автор).
            //         Profession: {  // профессия для которой задача
            //         Foto: {
            //         Resource: {    // требуемые ресурсы (материалы)
            //         ExpenseTime: {  // затраты времени на задачу
            // }
        
        let promise = Task.create(task);
        
        
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


module.exports.TaskCreate = TaskCreate;




function TaskUpdate(id, data, callback) {
    // найди запись по id , и поменяй там данные, и подтверди//
    log.debug('входные данные' + data);
    
    const option = { new: true };  // вернуть обновленный документ.
    const task = new Task(data);
      
    let promise = Task.findByIdAndUpdate(id, data, option);

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

module.exports.TaskUpdate = TaskUpdate;



function TaskFindAll(options, callback) {
      // получи все данные из коллекции Task и верни callback
        
    let promise = Task.find(options).sort({_id: -1 });
        
        promise
            .then(result => {
                callback(null, result);
                
    })
            .catch(err => {
                log.error(err);
                callback(err, null);
    
    });
    
    
   
};

module.exports.TaskFindAll = TaskFindAll;



//открыть конкретную запись.
function TaskFindById(id, option, callback)  {
    
//    
    let promise = Task.findById(id, option);
    
    
    
    promise
            .then(result => {
                //log.debug(result);
                callback(null, result);
                
    })
            .catch(err => {
                log.error(err);
                callback(err, null);
    });
        
//        
//      Task.findById(id, option, (err, data) => {
//      
//        if (err) {
//            callback(err, null);
//        } else {
//            callback (null, data);
//        }
//    
//        }); 
          
      
    
    
    
};


module.exports.TaskFindById = TaskFindById;





// удалить задачу
function TaskDel(id, callback) {
    
    log.debug('id request: ' + id);
    
    let promise = Task.findByIdAndRemove(id);
    
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


module.exports.TaskDel = TaskDel;



// удалить задачу
function TaskClose(id, callback) {
    
    
    log.debug('id request: ' + id);
        
    /*
     * получить id
     * найти задачу, присвоить сначения для закрытия задачи
     * вернуть callback
     */
    
    
    const option = { new: true };  // вернуть обновленный документ.

    
    let DateEnd = new Date();
    
    const data = {
        DateEnd: DateEnd,
        Status: "closed"


    };
    
    
    const task = new Task(data);
      
    let promise = Task.findByIdAndUpdate(id, data, option);

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


module.exports.TaskClose = TaskClose;






module.exports.Task = Task;
        



