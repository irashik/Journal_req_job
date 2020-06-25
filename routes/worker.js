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


// получить данные по конкретному работнику
workerRouter.get('/worker/:id', workerController.open);

// получение данных по всем работникам.
workerRouter.get('/worker', workerController.index);



// добавление работника в базу данных.
workerRouter.post('/worker/add', workerController.created);

// обновление информации о работнике
workerRouter.post('/worker/saved', workerController.saved);





module.exports = workerRouter;