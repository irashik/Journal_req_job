// тест для тестирование контроллера task

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
const controller       = require('./task.controller');
const Task           = require('./task.model');


chai.use(chaiAsPromised);
chai.use(chaiHttp);



describe("Test модуля task.controller", function() {
    
    
    
    describe('Тестирование метода open', () => {
         
        afterEach(() => {
             Task.TaskFindById.restore();
              
        });
       
        describe("Test1 - standart behavior", () => {
                        
            before(() => {
                
                const callback = "callback";
                const stub = sinon
                                .stub(Task, 'TaskFindById')
                                .yields(null, callback);
                                //.callsArg(null, callback); // почему так не работает?
                   
            });
            

                it ('Стандартное поведение', function() {
                 /*
                  * обращаемся к методу
                  * в запросе должен содержаться id
                  * метод должен обратиться к базе данных
                  * метод должен вернуть данные из базы  callback.
                  * надо проверить исполнение ответа http с передачей параметра
                  */

                 let request = httpMocks.createRequest({
                    method: 'get',
                    url: '/Joblist/:id',
                    params: {
                        id: 333
                    }
                });
                
                let response = httpMocks.createResponse();
                 
                 
                controller.open(request, response);
                
                
                
                should(response.status.calledOnce).be.true;
                should.equal(response._getData(), 'callback', ['all right!']);
                expect(response.statusCode).to.equal(200);
                  
                 });

             });
        
        ///////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        describe("Test2 - return error", () => {
              
         
            before(() => {
                
                const err = "ошибка от БД";
                
                const stub = sinon
                            .stub(Task, 'TaskFindById')
                            .yields(err, null);
                    
                                    
            });
             
         
         
            it ('возвращается error из БД', function() {
                                    
                  let request = httpMocks.createRequest({
                    method: 'get',
                    url: '/Joblist/:id',
                    params: {
                        id: 333
                    }
                });
                
                let response = httpMocks.createResponse();
                          
                const err = "ошибка от БД";

                let error_contr = 'Ошибка от базы данных ' + err;
             
             
             controller.open(request, response);
                      
          
          
            should(response.status.calledOnce).be.true;
             
            expect(response.statusCode).to.equal(204);
             
            should.equal(response._getData(), error_contr); // это лишнее.

             
         });
    });
         
        describe("Test 3 -  transfer to next ", () => {
               
                before(() => {
                
                const err = "ошибка от БД";
                
                const stub = sinon
                            .stub(Task, 'TaskFindById')
                            .yields(err, null);
                    
                                    
            });
            
                                 
            it ('Test 3 - no id', function() {
                               
                /* 
                 * ожидаю передачу управления по next()
                 */
                
                
                let request = httpMocks.createRequest({
                    method: 'get',
                    url: '/Joblist/:id',
                    params: {
                        id: null
                    }
                });
                
                let response = httpMocks.createResponse();
                          
                let next = sinon.spy();
                
                
                controller.open(request, response, next);

                should(next.calledOnce).be.true;

                
                
             
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
              
             Task.TaskFindAll.restore();
                 
             
             });
        
          describe("Test1 - standart behavior", () => {
        
            before(() => {
                 
                 const data = { name: 'name' };
                 const err = null;
                                
                 const stub = sinon
                            .stub(Task, 'TaskFindAll')
                    
                            .yields(err, data);
                   
                 });


                it ('res.render + params', function() {
               
                 /*
                  * обращаемся к методу
                  * метод должен обратиться к базе данных
                  * и метод должен вернуть данные из базы -курсор и статус сообщения - ок или ошибка.
                  * 
                  */
                    
                        let req = httpMocks.createRequest({
                            method: 'get',
                            url: '/Joblist/',
                            params: {
                                option: {
                                    
                                }
                            }
                        });

                        let res = httpMocks.createResponse();
                        let status = 'ok';
                        let data = { name: 'name' };
                        let param = { data: data, status: status, id_task: null };
                 
                         controller.index(req, res);
                         /*
                          * Проверяю ответ (res.render) с заданными параметрами
                          */
                
                
                        should(res.render.calledOnce).be.true;
                        
                        //res._getRenderView().should.be.calledOnce(); // а так не работает.
                        
                        res._getRenderData().should.be.eql(param);
  
                    



                    
                 });

             });
         

         

       
         });
         
    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    describe('Тестирование метода saved', () => {
            
        /*
             * 
             * передаем пост запрос контроллеру с данными
             * если есть id 
             *      находим и обновляем запись
             *      возвращаем статус и сообщение
             * если нет id
             *      создаем новую запись
             *      возвращаем статус и сообщение с информацией
             * 
             */
            
                   
        describe("Test1 - standart behavior - create", () => {
                                    
            before(() => {
                const callback = "callback";
                const stub = sinon
                                .stub(Task, 'TaskCreate')
                              //  .yields(null, callback);
                              //.callsArg(null, callback); // почему так не работает?
                              .returns(null, callback);
            });
            

                it ('test1', function() {
                    let request = httpMocks.createRequest({
                        method: 'post',
                        url: '/Joblist/saved',
                        params: {
                        
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.saved(request, response);
                
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(200);
                    
                  
                 });
                 
                 
                 after(() => {
                    Task.TaskCreate.restore();

                 });

             });
        
     
     
          describe("Test2 - create - error", () => {
                        
            before(() => {
                const stub = sinon
                            .stub(Task, 'TaskCreate')
                              .yields('error', null);
                              //.callsArg(null, callback); // почему так не работает?
                              //.returns('error', null);
            });
            
            it ('test2 - create error', function() {

                    let request = httpMocks.createRequest({
                        method: 'post',
                        url: '/Joblist/saved',
                        params: {
                        
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.saved(request, response);
                
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(500);
                    
                  
                 });
                 
            after(() => {
                    Task.TaskCreate.restore();

            });

             });
     
          
        describe("Test3 - Update - error", () => {
                        
            before(() => {
                const stub = sinon
                                .stub(Task, 'TaskUpdate')
                                  .yields('error', null);
                                  //.callsArg(null, callback); // почему так не работает?
                                //.returns('error', null); // это тоже некорректно работает
            });

            it ('test3 - update error', function() {
                let request = httpMocks.createRequest({
                        method: 'post',
                        url: '/Joblist/saved',
                        params: {
                        
                        },
                        
                        body: {
                            id: 123
                        }
                    });
                
                let response = httpMocks.createResponse();
                            
                
                
                controller.saved(request, response);
                
                should(response.status.calledOnce).be.true;
                expect(response.statusCode).to.equal(500);
                    
                  
            });
                 
            after(() => {
                Task.TaskUpdate.restore();

            });

        });
        
        
        
        
         describe("Test4 - Update - successfully", () => {
                        
            before(() => {
                const stub = sinon
                                .stub(Task, 'TaskUpdate')
                                  //  .yields(null, callback);
                                  //.callsArg(null, callback); // почему так не работает?
                                .returns(null, 'callback');
            });

            it ('test4 - update successfully', function() {
                let request = httpMocks.createRequest({
                        method: 'post',
                        url: '/Joblist/saved',
                        params: {
                        
                        },
                        body: {
                            id: 123
                        }
                    });
                
                let response = httpMocks.createResponse();
                                  
                controller.saved(request, response);
                
                should(response.status.calledOnce).be.true;
                expect(response.statusCode).to.equal(200);
                    
                  
            });
                 
            after(() => {
                Task.TaskUpdate.restore();

            });

        });
     
          
                        

          
          
          
          

             
         });
        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    describe('Тестирование метода delete', () => {
            /*
             * 
             * передаем delete запрос контроллеру taskController.del
             * в запросе передаем id 
             *      находим и удаляем запись
             * иначе выдаем ошибку
             * 
             */
            
                   
       
                                    
            it ('test1 - standart behavior', function() {
                   
                    const stub = sinon
                                    .stub(Task, 'TaskDel')
                                    .yields(null, 'callback');     
            
                    
                    
                    let request = httpMocks.createRequest({
                        method: 'delete',
                        url: '/Joblist/:id',
                        params: {
                            id: 123
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.del(request, response);
                            
                            
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(200);
                 
                  
                   Task.TaskDel.restore();
                  
                 });
                 
                 
            
        
            
               it ('test2 - return error', function() {
                   
                    const stub = sinon
                                    .stub(Task, 'TaskDel')
                                    .yields('error', null);     
            
                    
                    let request = httpMocks.createRequest({
                        method: 'delete',
                        url: '/Joblist/:id',
                        params: {
                            id: 123
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.del(request, response);
                            
                            
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(500);
                 
                  
                    Task.TaskDel.restore();
                  
                 });
                 
                 
            
          
     
     
      
          
          

             
         });

    
    describe.only('Тестирование метода close', () => {
            /*
             * 
             * передаем delete запрос контроллеру taskController.del
             * в запросе передаем id 
             *      находим и удаляем запись
             * иначе выдаем ошибку
             * 
             */
            
                   
       
                                    
            it ('test1 - standart behavior', function() {
                   
                    const stub = sinon
                                    .stub(Task, 'TaskUpdate')
                                    .yields(null, 'callback');     
            
                    
                    
                    let request = httpMocks.createRequest({
                        method: 'get',
                        url: '/Joblist/close/:id',
                        params: {
                            id: 123
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.close(request, response);
                            
                            
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(200);
                 
                  
                    Task.TaskUpdate.restore();
                  
                 });
                 
                 
            
        
            
               it ('test2 - return error', function() {
                   
                    const stub = sinon
                                    .stub(Task, 'TaskUpdate')
                                    .yields('error', null);     
            
                    
                    let request = httpMocks.createRequest({
                        method: 'get',
                        url: '/Joblist/:id',
                        params: {
                            id: 123
                        }
                    });
                
                    let response = httpMocks.createResponse();
                                  
                    controller.close(request, response);
                            
                            
                    should(response.status.calledOnce).be.true;
                    expect(response.statusCode).to.equal(500);
                 
                  
                    Task.TaskUpdate.restore();
                  
                 });
                 
                 
            
          
     
     
      
          
          

             
         });

    
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});


