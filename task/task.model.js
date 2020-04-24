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



const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
const log                           = require('../utils/log')(module);
let Schema                    = mongoose.Schema;


let TaskSchema = new Schema({
  
  Name: {
    type: String,
    required: true,
    maxlength: 100
  },
  
  Description: {
    type: String,
    maxlength: 600
    
  },
  DateStart: {
    type: Date,
    default: Date.now
    
  },
  Status: {     // статус задачи [активная, в процессе, завершена, отложена,]
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
      type: String   
  },
  Profession: {  // профессия для которой задача
      type: String
  },
  Foto: {
      type: String // нужно тип binData но чет незнаю
  },
  Resource: {    // требуемые ресурсы (материалы)
      type: String,
      default: null
  },
  ExpenseTime: {  // затраты времени на задачу
      type: String 
  }
             
});


const Task = db.model('Task', TaskSchema);



//todo подумай над реализацие очередности задач (список задач сначало это потом то, затем...)


function TaskCreate(data, callback) {
    // создай запись в базе данных, и верни подтверждение
    
    
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
        
        
    
    task.create(function(err) {
        if (err) return log.error(err);
    });
    
    
    
    
};

function TaskUpdate(id, data, callback) {
    
    // найди запись по id , и поменяй там данные, и подтверди//
    
    const option = { new: true };  // вернуть обновленный документ.
    
    
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
        
        
    
    task.findByIdAndUpdate(id, data, option, function(err) {
        if (err) return log.error(err);
        
    });
    
    
    
};


function TaskFindAll(cursor) {
      // получи все данные из коллекции Task и верни callback
    
   Task.find({}, function(err, cursor) {
       if (err) return log.error(err);
       return cursor;
       
   });
   
};











let TaskFindById = function(id) {
    
    
    Task.findById(id, function(err, task) {
        if(err) return log.error(err);
        log.debug(task);
    });
};







// удалить задачу
let TaskDel = function(id) {
    
    
    Task.remove({ id: id }, function (err, result) {
        if(err) return log.debug(err);
                log.debug(result);
    });
    
    
};
 

module.exports.Task = Task;
        

