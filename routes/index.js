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

 
router.get('/login', function(req, res) {
     
    res.render('login', {  });
     
     log.info('get login');
     
                          
});


router.get('/register', function(req, res) {
     
    res.render('register', {  });
     
     log.info('get register');
     
                          
});







module.exports = router;
