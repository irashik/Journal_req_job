/*
 * основной роутер принимающий запросы
 */
 'use strict';

const express        = require('express');
const router         = express.Router();
const log                           = require('../utils/log')(module);






    
router.get('/', function(req, res) {
     
    res.render('index', {  });
     
    //log.info(req.headers);
     
                          
});


// отдельная страница Dashboard для отчетов. ))
router.get('/report', function(req, res) {
     res.render('report', {  });
                          
});


router.get('/about', function(req, res) {
    
    log.info('get about router');
    res.render('about', {  });
                               
});

module.exports = router;
