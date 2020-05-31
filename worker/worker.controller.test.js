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

const controller       = require('./worker.controller');

const Worker           = require('./worker.model');



chai.use(chaiAsPromised);


describe("Test модуля worker.controller", function() {
    
    
    
     describe('Тестирование метода create', () => {
         
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
     
    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
     describe('Тестирование метода index', () => {
        
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
             
              afterEach(() => {
              
                 Worker.FindAllWorker.restore();
                 
             
             });
        
          describe("Testing method 1 - return ok + data", () => {
        
            before(() => {
                 
                 const data = { name: 'name' };
                 const err = null;
                                
                 const stub = sinon
                            .stub(Worker, 'FindAllWorker')
                            .yields(data, err);
                   
                 });


                it ('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу
                  * метод должен обратиться к базе данных
                  * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
                  * // надо проверить исполнение ответа http с передачей параметра
                  */

                 let status = 'ok';
                 let data = { name: 'name' };
                 let respond = { data: data, status: status };
                 let req = { };
                                  
                 let res = {
                     render: sinon.spy()
                 };
                 
                 controller.index(req, res);
                 
                 
                 should(res.render.calledOnce).be.true;
                 should(res.render.firstCall.args[1]).containDeep(respond);
                    
                 });

             });
         

          describe("Testing create method 2", () => {
         
             before(() => {
                     const err = 'error';
                     const data = {};
                     const stub = sinon
                            .stub(Worker, 'FindAllWorker')
                            .yields(data, err);
                    
             });
         
               it ('возвращается error  из БД - поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
                         
                 let req = { };
                 let res = {
                     render: sinon.spy()
                 };
                 
                 const respond = { data: null, status: "Error response Database" };
             
             
             controller.index(req, res);
                      
          
             should(res.render.calledOnce).be.true;
             should(res.render.firstCall.args[1]).containDeep(respond);
             

                });
           });

       
         });
         
    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
     describe('Тестирование метода saved', () => {
              
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен  найти заданный id и обновить данные в базе и сообщить статус - ок или ошибка.
              * 
              */
             
              afterEach(() => {
              
                 Worker.WorkerSaved.restore();
                 
             
             });
        
             describe("Testing method 1 - return ok", () => {
        
            before(() => {
                 
                 const callback = 'ok';
                 const err = null;
                 
                   let req = { 
                             params: {
                                       id: 1,
                                       body: { 
                                           name: 'name' 
                                       }
                             }
                          };  


                                
                 const stub = sinon
                            .stub(Worker, 'WorkerSaved')
                            .withArgs(req.params.id, req.params.body)
                            .yields(callback, err);
                           
                   
                 });


                it ('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу c аргументом id и данными
                  * метод должен обратиться к базе данных
                  * и метод должен записать данные и вернуть статус сообщения - ок или ошибка.
                   */

                 
                  let respond = {
                                   status: 'Данные обновлены', info: 'ok' 
                               };

                 
                  let req = { 
                              params: {
                                       id: 1,
                                       body: { 
                                           name: 'name' 
                                       }
                             }
                          };
                 
                 
                                                   
                                  
                 let res = {
                     render: sinon.spy()
                 };
                 
                 controller.saved(req, res);
                 
                 
                 should(res.render.calledOnce).be.true;
                 
                 
                 should(res.render.firstCall.args[1]).containDeep(respond);
               
                    
                 });

             });
         

             describe("Testing saved method 2", () => {
              
                    const err = 'error';
         
             before(() => {
                     
                    
                    const callback = '23984290$#%#sjwjewjr';
                 
                    let req = { 
                         params: {
                                 id: 1,
                                  body: { 
                                        name: 'name' 
                                  }
                        }
                    };  
                     
                     
                    
                     const stub = sinon
                            .stub(Worker, 'WorkerSaved')
                            .withArgs(req.params.id, req.params.body)
                            .yields(callback, err);
                    
             });
         
               it ('возвращается error  из БД - поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
                 
                 let respond = {
                         status: 'Error response Database', info: err 
                 };
 
                 
                 let req = { 
                             params: {
                                       id: 1,
                                       body: { 
                                           name: 'name' 
                                       }
                             }
                          };
                 
                 
                                                   
                 
                 let res = {
                     render: sinon.spy()
                 };
                 
             
             
             controller.saved(req, res);
          
             should(res.render.calledOnce).be.true;
             should(res.render.firstCall.args[1]).containDeep(respond);
             

                });
           });
           
           
           
             describe("Testing saved method 3", () => {
              
                    const err = 'error';
         
             before(() => {
                     
                    
                    const callback = '23984290$#%#sjwjewjr';
                 
                    let req = { 
                         params: {
                                 id: null,
                                  body: { 
                                        
                                  }
                        }
                    };  
                     
                     
                    
                     const stub = sinon
                            .stub(Worker, 'WorkerSaved')
                            .withArgs(req.params.id, req.params.body)
                            .yields(callback, err);
                    
             });
         
               it ('возвращается error  из БД - поведение', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
                 
                 let respond = {
                         status: 'Error response Database', info: err 
                 };
 
                 
                 let req = { 
                             params: {
                                       id: null,
                                       body: { 
                                           
                                       }
                             }
                          };
                 
                 
                                                   
                 
                 let res = {
                     render: sinon.spy()
                 };
                 
             
             
             controller.saved(req, res);
          
             should(res.render.calledOnce).be.true;
             should(res.render.firstCall.args[1]).containDeep(respond);
             

                });
           });


             
         });
        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
     describe('Тестирование метода open', () => {
        
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор или выдать ошибку.
               */
             
             
               afterEach(() => {
              
                 Worker.WorkerOpen.restore();
                 
             
             });
        
          describe("Testing method 1 - return ok", () => {

             const data = { id: 1, name: 'name', age: 36 };
             const err = null;


              before(() => {
                 
                 let req = { 
                             params: {
                                       id: 1
                                      
                             }
                          };  

                                
                 const stub = sinon
                            .stub(Worker, 'WorkerOpen')
                            .withArgs(req.params.id)
                            .yields(data, err);
                           
                   
                 });


                it ('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу c аргументом id и данными
                  * метод должен обратиться к базе данных и вернуть данные и статус сообщения - ок или ошибка.
                  */
                 
                  let respond = {
                                   status: 'Данные получены', info: data 
                               };

                 
                  let req = { 
                              params: {
                                       id: 1
                                      
                             }
                          };
                 
                 
                                                   
                                  
                 let res = {
                     render: sinon.spy()
                 };
                 
                 controller.open(req, res);
                 
                 
                 should(res.render.calledOnce).be.true;
                 should(res.render.firstCall.args[1]).containDeep(respond);
               
                    
                 });

             });
             
   describe("Testing saved method 2", () => {
             
             
              const err = 'error';
              
           

         
             before(() => {

              const callback = null;

              let req = { 
                         params: {
                                 id: '129384D34sfdf34'
                                  
                        }
                    };           
                 
                    
                     
                     
                    
                     const stub = sinon
                            .stub(Worker, 'WorkerOpen')
                            .withArgs(req.params.id)
                            .yields(callback, err);
                    
             });
         
               it ('поведение: возвращается ошибка из БД', function() {
             /*
              * обращаемся к методу
              * метод должен обратиться к базе данных
              * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
              * 
              */
                 
                 let respond = {
                         status: 'Error response Database', info: err 
                 };
 
                                 
                    let req = { 
                         params: {
                                 id: '129384D34sfdf34'
                                  
                        }
                    };                                    
                 
                 let res = {
                     render: sinon.spy()
                 };
                 
             
             
             controller.open(req, res);
          
             should(res.render.calledOnce).be.true;
             should(res.render.firstCall.args[1]).containDeep(respond);
             

                });
           });
             
             
             
     });             
         
   
    
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});


