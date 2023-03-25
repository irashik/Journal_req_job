/*
 * 
 * роутер принимает запросы по запросам /task
 * и перенаправляет их контроллеру.
 */
'use strict';
const express                       = require('express');
const timesheetRouter               = express.Router();
const log                           = require('../utils/log')(module);
const timesheetController                = require('../timesheet/timesheet.controller');


const authenticationMiddleware      = require('../middleware/auth');

        // проверку аутентификации добавить.


timesheetRouter.get('/timesheet/:id', timesheetController.open);

timesheetRouter.get('/timesheet', timesheetController.index);

timesheetRouter.post('/timesheet/saved', timesheetController.saved);

timesheetRouter.post('/timesheet/created', timesheetController.created);


module.exports = timesheetRouter;