// тест для тестирование контроллера worker

'use strict';



let assert = require('assert');



const controller = require('./worker.controller');


describe("Test модуля worker.controller", function() {
    
    
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
    
    
    
    
});

