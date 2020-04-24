/*
 * класс реализует работу с базой данных в части журнала работ
 * создание схемы
 * * запись в базу денных
 *
 * 
 * внесение изменений в базу данных
 * 
 * 
 */
'use strrict';



const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
const log                     = require('../utils/log')(module);
let Schema                    = mongoose.Schema;


const Worker                          = require('../worker/worker.model');



//TODO  импорт схемы из worker.model

 // схема для записей журнала
let JRecord = new Schema({
   
    Date: {
        type: Date,
        default: Date.now
    },   
    Task: [ JTask ],
    Worker: [ Worker ],
    
    
    
    
    
    WorkingTime: {
        type: Number
    },
    
    VolumeWork: {  // объем работы штуки, кв.метры
        unit: {   /// единицы измерения
            type: String
        },
        quantity: {  // количество
            type: Number
        }
      
    },
    StandartTime: {  //норматив времени на задачу чел*час
        type: Number
    },
    deviation: {         // отклонение "норма/затраты времени" в целом можно вычислять
        type: Number
    },
    indexKTU: {   // алгоритм вычисления???
        type: Number
    },
    
    
    
       
    
    
    
    
    
    
});



// схема для заданий в журнала (в идеале связь с коллекцией task)
// TODO каким образом реализовать связь с task ?


let JTask = new Schema({   
  
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
  TypeTask: {  // тип задачи (хоз.раб; срочный ремонт, ремонт, обслуживание, ппр, план ОГМ ??).
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

       //todo подумай над реализацие очередности задач (список задач сначало это потом то, затем...)
 

module.exports = db.model('JRecord', JRecord);


