
/*
 * 
 * роутер принимает запросы по запросам /journal
 * и перенаправляет их контроллеру.
 */

'use strict';

const express                       = require('express');
const journalRouter                 = express.Router();

const log                           = require('../utils/log')(module);


const journalController = require('../journal/journal.controller');


journalRouter.get('/JobList', journalController.index);

journalRouter.get('/JobList/saved', journalController.saved);

journalRouter.get('/JobList/created', journalController.created);




module.exports = journalRouter;