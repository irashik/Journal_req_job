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
const taskController                = require('../task/task.controller');
const authenticationMiddleware      = require('../middleware/auth');

// проверку аутентификации добавить.




// открыть задачу использую taskController
Router.get('/Report/:id', taskController.open);

// открытие страницы Report 
Router.get('/Report', reportController.index);



module.exports = Router;