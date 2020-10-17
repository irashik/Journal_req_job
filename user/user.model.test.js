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
                     expect(hash).to.be.true;
                     expect(salt).to.be.true;
                    salt.should.be.calledOnce();
                     //salt.should.be.calledTwice();
                     
                
                
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
                     
                     expect(hash).to.be.null;
                   expect(salt).to.be.null;
                     //salt.should.not.be.ok;
                    // expect(salt).to.be.null;
                     should.not.exist(salt);
                //   should.not.exist(hash);
                     
                     
                 // done();   
                     
                
                  });
                  
                 
                                
      
                
        });

           
        

    });
         

    
    
    
    describe.only('Testing Register method', () => {
       
        it('standart behavior', () => {
           
           let namemail = Math.round(Math.random() * 100000);
           let email = namemail + '@test.ru';
           
           
           let data = {
               Name: "test",
               Email: email,
               Password: '123',
               Salt: '123',
               
               
           };
           
           
           let promise = User.Register(data);
           
           promise
                   .then(result => {
                       //   log.info(result);
                
                
                log.debug('Данные пользователя= ' + result[0]);
                log.debug('Статус отправки админу= ' + JSON.stringify(result[1]));
                log.debug('Статус отправки пользователю: ' + JSON.stringify(result[2]));
             
                
              //  log.warn(result[1].value);
                
                
                    })
                    .catch(err => {
                
                
                        log.error(err);
                
                    });
            
            
                
           });
            
            
            
            
            
            
      
        
        
    });
    
    
    
      describe('Testing SendMailAdmin method', () => {
       
        it('standart behavior', () => {
           
           let user = {
               Name: "test",
               Email: "123@test.ru",
               Password: '123',
               Position:  'brigadir',
               Departament: 'RHU area',
               _id: 'sdlkjf203984209834'
               
               
           };
           
           let promise = User.SendMailAdmin(user);
           
           promise.then(result => {
               log.debug('respond sendmailAdmin= ' + result);
               
           })
           .catch(err => {
               
                       log.debug('error= ' + err);
           });
           
            
        });
        
    });
    
    
    
      describe('Testing SendMailUser method', () => {
       
        it('standart behavior', () => {
           
           let user = {
               Name: "test",
               Email: "123@test.ru",
               Password: '123',
               Position:  'brigadir',
               Departament: 'RHU area',
               _id: 'sdlkjf203984209834'
               
               
           };
           
           let promise = User.SendMailUser(user);
           
           promise.then(result => {
               log.debug(result);
               
           })
           .catch(err => {
                       log.debug('error= ' + err);
           });
           
            
        });
        
    });
    
    
    
    
    
    
    
    
         
///////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
        