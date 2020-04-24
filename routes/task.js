
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



taskRouter.get('/JobList', taskController.index);

taskRouter.get('/JobList/open', taskController.open);

taskRouter.get('/JobList/del', taskController.del);

taskRouter.post('/JobList/saved', taskController.saved);

taskRouter.post('/JobList/created', taskController.created);


module.exports = taskRouter;