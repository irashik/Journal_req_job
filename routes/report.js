
/*
 * 
 * роутер принимает запросы по запросам /task
 * и перенаправляет их контроллеру.
 */
'use strict';

const express                       = require('express');
const Router                        = express.Router();
const log                           = require('../utils/log')(module);
const reportController                = require('../report/report.controller');




// открытие страницы Report 
Router.get('/Report', reportController.index);


//
//// удаление задачи
//Router.delete('/JobList/:id', taskController.del);
//
//
//Router.get('/JobList', taskController.index);
//
//
////добавление новой задачи + изменение существующей
//Router.post('/JobList/saved', taskController.saved);
//
//
////todo   // изменение задачи
////taskRouter.put('/JobList/saved', taskController.update);




module.exports = Router;