/*
 * тестирование модуля task.controller
 * 
 * 
 */


const assert = require('assert');

const { mockRequest, mockResponse } = require('../utils/interceptor');
const controller = require('task.controller');



describe("Test модуля task.constroller", function() {

  describe("Проверка маршрутов - Сценарий ???", function() { 
      
  
    it ('проверка маршрутов', async function() {
        //todo:
        const req = mockRequest();
        const res = mockResponse();
        
        await controller.todoController(req, res);
        
        expect(res.send).toHave
        
        
    });
    
  });

});
