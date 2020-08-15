/*
 * основной роутер принимающий запросы
 */
 'use strict';

const express        = require('express');
const router         = express.Router();
const log                           = require('../utils/log')(module);






    
router.get('/', function(req, res) {
     
     
    log.debug('Flash: ', req.flash('message'));
    
    res.render('index', {  });
     
    //log.info(req.headers);
     
                          
});


// отдельная страница Dashboard для отчетов. ))
router.get('/report', function(req, res) {
    
//    log.debug('Flash: ' + req.flash('message'));
//    log.debug('Flash2: '+  req.flash('warning'));
//    

    res.render('report', { message: req.flash('message'), warning: req.flash('warning') } );
                          
});


router.get('/about', function(req, res) {
    
    req.flash('message', 'my messages skdjfsjlfkj');
    req.flash('warning', 'important!');
            
    log.info('get about router');
    
    res.render('about', {  });
                               
});

module.exports = router;
