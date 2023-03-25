/*
 *  модель реализующая функционал табеля учета рабочего времени
 *  
 *  Добавление записей по каждому из работников в коллекцию.
 *  Ticket - для каждой даты, для каждого работника
 *  
 */

const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
const log                     = require('../utils/log')(module);
const Worker                  = require('../worker/worker.model');
let Schema                    = mongoose.Schema;


// todo реализуй date references
//TODO  импорт схемы из worker.model

 // схема для записей журнала
let TSheet = new Schema({
   
    Date: {
        type: Date,
        default: Date.now
    },   
    
    Worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    }, 
    WorkingTime: {
        type: Number
    },
    Comment: {
        type: String
        
    } 
});
module.exports = db.model('TSheet', TSheet);


