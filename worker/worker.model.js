
/*
 * создаем схему в базе данных
 * получаем данные от контроллера
 * записываем данные в базу данных
 */

'use strict';


const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
let Schema                    = mongoose.Schema;



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

