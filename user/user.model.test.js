// тест для тестирование  task.model.js

'use strict';



const chai             = require('chai');
const assert           = chai.assert;
const expect           = chai.expect;
const should           = require('should');
const chaiAsPromised   = require('chai-as-promised');
const chaiHttp         = require('chai-http');
const httpMocks        = require('node-mocks-http');
const sinon            = require('sinon');
const _                = require ('lodash');
const log              = require('../utils/log')(module);

//const shouldSinon       =
        require('should-sinon');

const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
let Schema                    = mongoose.Schema;


const User                    = require('./user.model.js');





let TestSchema = new Schema({
  
  Name: {          // имя задачи - краткое описание.
    type: String,
    required: true,
    maxlength: 100
  },
  
  Description: {  // более подробное описание задачи
    type: String,
    maxlength: 600
    
  },
  DateStart: {     // дата создания задачи
    type: Date,
    default: Date.now
    
  }
  
             
});


const Test = db.model('Test', TestSchema);


chai.use(chaiAsPromised);
chai.use(chaiHttp);





describe("Test модуля user.model", function() {
    
    // это уже не модульный тест а, думаю, интеграционный
    
    describe("method setPassword", () => {
        
        
        it('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу отдаем ему пароль
                  * ожидаем от него возврат коллбэка с результатом (hash + salt)
                  * 
                  * 
                  */

                  User.setPassword('testpassword', (hash, salt) => {
                     
                     // проверим что возвращаемые данные не null
                     
//                     log.warn(hash);
//                     log.warn(salt);
//                   
                     expect(hash).to.be.true;
                     expect(salt).to.be.true;

                
                
                  });
                                
      
                
        });
        
        
        
        it('передаем пустой пароль ', function() {
                 /*
                  * обращаемся к методу отдаем ему пароль пустой
                  * ожидаем от него возврат коллбэка с результатом (hash + salt)
                  * 
                  * 
                  */

                  User.setPassword('', (hash, salt) => {
                     
                     // проверим что возвращаемые данные не null
                     
                     expect(hash).to.be.false;
                     expect(salt).to.be.false;
                     
                     
                
                
                  });
                                
      
                
        });

           
        

    });
         

    
    
    
    describe('Testing Register method', () => {
       
        it('standart behavior', () => {
           
           let data = {
               Name: "test",
               Email: "1234@gsdf.ru",
               Password: '123'
               
           };
           
           
           User.Register(data, (err, data) => {
              
               if(err) {
                   log.error(err);
               } else {
                   log.info(data);
               }
                
           });
            
            
            
            
            
            
        });
        
        
    });
    
    
    
    
    
    
    
    
    
    
    
         
///////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
        