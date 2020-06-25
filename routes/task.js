
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

taskRouter.get('/JobList', taskController.index);

taskRouter.post('/JobList/saved', taskController.saved);

taskRouter.get('/JobList/del', taskController.del);

taskRouter.get('/JobList/close', taskController.close);


module.exports = taskRouter;