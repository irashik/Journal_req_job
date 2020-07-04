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



router.post('/request', function(req, res) {
    
    
    log.debug('request content:  ' + JSON.stringify(req.body));
    res.send('request received');
    
});








module.exports = router;
