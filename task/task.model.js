/*
 * класс реализует работу с базой данных 
 * запись в базу денных
 * создание схемы
 * 
 * внесение изменений в базу данных
 * 
 * нужен метод которы реализиует сортировку и фильтрацию.
 */



const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
let Schema                    = mongoose.Schema;



let Task = new Schema({
  
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
    type: Date
    
  },
  Status: {
      type: String
  },
  DateEnd: {
      type: Date
  },
  Responsible: {
      type: String
      
  },
  Priority: {
      type: String
      
  },
  TypeTask: {  // тип задачи (хоз.раб; срочный ремонт, ремонт, обслуживание).
      type: String
  },
  Creator: {   // создатель задачи (автор).
      type: String   
  },
  Profession: {  // профессия для которой задача
      type: String
  },
  Foto: {
      type: 5 //binData
  },
  Resource: {    // требуемые ресурсы
      type: String
  },
  ExpenseTime: {  // затраты времени на задачу
      type: String 
  }
             
});



module.exports = db.model('Task', Task);

