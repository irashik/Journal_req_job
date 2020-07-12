
/*
 * 
 * роутер принимает запросы по запросам /task
 * и перенаправляет их контроллеру.
 */
'use strict';

const express                       = require('express');
const taskRouter                    = express.Router();
const log                           = require('../utils/log')(module);
const taskController                = require('../task/task.controller');




taskRouter.get('/JobList/:id', taskController.open);

// удаление задачи
taskRouter.delete('/JobList/:id', taskController.del);


taskRouter.get('/JobList', taskController.index);


//добавление новой задачи
taskRouter.post('/JobList/saved', taskController.saved);


  // изменение задачи
//taskRouter.put('/JobList/saved', taskController.update);




taskRouter.get('/JobList/close', taskController.close);


module.exports = taskRouter;