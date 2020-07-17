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
const log                           = require('../utils/log')(module);

//const shouldSinon       =
        require('should-sinon');

const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
let Schema                    = mongoose.Schema;


const model             =require('./task.model.js');







chai.use(chaiAsPromised);
chai.use(chaiHttp);


describe("Test модуля task.module", function() {
    
    // это уже не модульный тест а, думаю, интеграционный
    
    describe("method TaskCreate", () => {
        
        
        it('Стандартное поведение', function() {
                 
            
            
            /*
                  * обращаемся к методу
                  * отдаем ему данные как объект для создания записи
                  * ожидаем от него возврат коллбэка с результатом либо ошибкой
                  * 
                  * 
                  */


                                
                const data = {       
                     Name: "Test Task2",
                     Description: "Test Task1 Description",
                     DateStart: new Date(),
                     Status: 'test'
                };
               
                
                 
                model.TaskCreate(data, (err, callback) => {
                   
                    should.exist(callback._id);
                
                });
                
                  
                
        });

           
        

    });
         
         
        ///////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
     describe.only("method TaskFindAll", () => {
        
        
        it('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу
                  * передаем ему options в качестве аргумента
                  * 
                  * ожидаем от него возврат коллбэка с результатом либо ошибкой
                  * результатом должен быть курсор -- что тут будет критерием тестирования??
                  * 
                  * 
                  */

                  // делать подключение к тестовой базе и коллекции с известными данными??

                const options =  {
                    Status: { $ne: 'Выполнена'}
                };
                
                
                 
                model.TaskFindAll(options, (err, callback) => {
                                
                    log.info(callback);
                    log.error(err);
                    
                    //err.should.never.CalledWith();
                    callback.should.calledOnce();
                    callback.should.have.callCount();
                    
                
            });
                
                
                
                                
                  
                  
                
        });

           
        

       
         
//            
//             
//        });
         
    });
             
        
        
        
        
        
    });
