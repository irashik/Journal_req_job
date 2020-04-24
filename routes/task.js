
/*
 * 
 * роутер принимает запросы по запросам /task
 * и перенаправляет их контроллеру.
 */
'use strict';

const express                       = require('express');
const taskRouter                    = express.Router();
const log                           = require('../utils/log')(module);


const taskController = require('../task/task.controller');


taskRouter.get('/JobList/saved', taskController.saved);

taskRouter.get('/JobList', taskController.index);

taskRouter.get('/JobList/created', taskController.created);

module.exports = taskRouter;