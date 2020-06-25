
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


journalRouter.get('/journal/:id', journalController.open);

journalRouter.get('/journal', journalController.index);

journalRouter.get('/journal/saved', journalController.saved);

journalRouter.get('/journal/created', journalController.created);

journalRouter.get('/journal/del', journalController.delete);



module.exports = journalRouter;