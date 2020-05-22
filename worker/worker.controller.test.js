// тест для тестирование контроллера worker

'use strict';



const chai             = require('chai');
const assert           = chai.assert;
const expect           = chai.expect;
const should           = require('should');
const chaiAsPromised   = require('chai-as-promised');
const sinon            = require('sinon');
const _                = require ('lodash');
const log                           = require('../utils/log')(module);
const request          = require('supertest');


const controller       = require('./worker.controller');

const Worker                        = require('./worker.model');



chai.use(chaiAsPromised);


describe("Test модуля worker.controller", function() {
    
     describe.only('Тестирование метода create', () => {
         
         afterEach(() => {
              
                 Worker.WorkerCreate.restore();
                 
             
         });
        
          describe("Testing create method 1 - return ok", () => {
        
            before(() => {
                 const status = 'ok';
                 const stub = sinon
                                .stub(Worker, 'WorkerCreate')
                                .yields(status);
                   
            });


                it ('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу
                  * метод должен обратиться к базе данных
                  * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
                  * // надо проверить исполнение ответа http с передачей параметра
                  */

                 let status = 'ok';

                 let req = { id: 1} ;
                 const respond = { status: 'ok'};
                 let res = {
                     render: sinon.spy()
                 };

                 controller.created(req, res);
                 
                 should(res.render.calledOnce).be.true;
                 should(res.render.firstCall.args[1]).containDeep(respond);
                  
                 });

             });
         

          describe("Testing create method 2", () => {
         
             before(() => {
                    const status = 'error';
                    const stub = sinon
                            .stub(Worker, 'WorkerCreate')
                            .yields(status);
                    
             });
         
               it ('возвращается error  из БД - поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
                         
                 let req = { id: 1} ;
                 let res = {
                     render: sinon.spy()
                 };
                 const respond = { status: 'error' };
             
             
             controller.created(req, res);
                      
          
             should(res.render.calledOnce).be.true;
             should(res.render.firstCall.args[1]).containDeep(respond);
             
             
         });
    });
         
         describe("Testing create method 3", () => {
               
             before(() => {
                   const status = null;
                   const stub = sinon
                            .stub(Worker, 'WorkerCreate')
                            .yields(status);
             });

            
               it ('возвращается error  из БД - поведение', function() {
                 let req = { id: 1} ;
                 let res = {
                     render: sinon.spy()
                 };
                 
                 let respond = { status: "Error response Database"};
                          
                 controller.created(req, res);
                     
                 should(res.render.calledOnce).be.true;
                 should(res.render.firstCall.args[1]).containDeep(respond);
                 
             
               });
         });
         
    });
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    describe('Тестирование метода index', () => {
               
        
         it ('Стандартное поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
             
             
             controller.index(res, req);
             
             
             
             
         });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     describe('Тестирование метода saved', () => {
               
        
         it ('Стандартное поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
             
             
             controller.saved(res, req);
             
             
             
             
         });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
     describe('Тестирование метода open', () => {
               
        
         it ('Стандартное поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
             
             
             controller.open(res, req);
             
             
             
             
         });
    });
    
    
    
});

