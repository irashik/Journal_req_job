/*
 * тестирование модуля task.controller
 * 
 * 
 */
'use strict';


const assert = require('assert');

//const should = require('should');

const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const _ = require ('lodash');
let log = console.log;
const isItDoneYet = require('./app');

chai.use(chaiAsPromised);
chai.should();


const assert = require('assert');

const { mockRequest, mockResponse } = require('../utils/interceptor');
const controller = require('task.controller');



describe("Test модуля task.constroller", function() {
     
     before(() => {
         console.log('Начинаем тесты');
     });
     

     after(() => {
        console.log("закончились тесты");
     });




     describe("Проверка  контроллера create", function() { 
      
  
        it ('проверка маршрутов', function() {
            //todo:
           
        });

         it ('проверка маршрутов', function() {
            //todo:
           


        });
        
     });

    
  
     describe("Проверка  контроллера index", function() { 
      
  
         it ('проверка маршрутов', async function() {
            //todo:
            const req = mockRequest();
            const res = mockResponse();

            await controller.todoController(req, res);

            expect(res.send).toHave


         });

         it ('проверка маршрутов', async function() {
            //todo:
            const req = mockRequest();
            const res = mockResponse();

            await controller.todoController(req, res);

            expect(res.send).toHave


         });

    
    
    
    
     });
  
  
     describe("Проверка  контроллера saved", function() { 
      
  
         it ('проверка маршрутов', async function() {
            //todo:
           
         });

         it ('проверка маршрутов', async function() {
            //todo:
           


         });

    
    
    
    
     });
  
  
  
     describe("Проверка  контроллера open", function() { 
      
  
         it ('проверка маршрутов', async function() {
            //todo:
           
         });

         it ('проверка маршрутов', async function() {
            //todo:
           


         });

    
    
    
    
     });

});
