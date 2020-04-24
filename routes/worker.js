/*
 * 
 * роутер принимает запросы по запросам /worker
 * и перенаправляет их контроллеру.
 */
'use strict';

const express                       = require('express');
const workerRouter                  = express.Router();
const log                           = require('../utils/log')(module);


const workerController = require('../worker/worker.controller');



workerRouter.post('/worker/add', workerController.saved);

     // добавление работника в базу данных.
     /*
      * если работника еще нет в базе работаем, если есть передаем методу сохранения изменений.
      * Получаем данные из полей FirstName LastName LastName2 profession quality status comment
      * 
      * 
      */
             //log.debug("get запрос /worker/add");

     
                          


workerRouter.get('/worker/saved', function(req, res) {
     // изменение данных работника в базе данных.
     log.debug("get запрос /worker/saved");
                          
});




// тут работает контроллер Worker.controller
workerRouter.get('/worker', workerController.index);





module.exports = workerRouter;