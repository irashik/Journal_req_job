/*
 * основной роутер принимающий запросы
 */
 'use strict';

const express        = require('express');
const router         = express.Router();
const log                           = require('../utils/log')(module);






    
router.get('/', function(req, res) {
    
     
    //req.flash('passport', "sdkfjskdjfsjf");
    //req.flash('warning', 'lkdjfsdjflks');
    
    
    res.render('index', { user: req.user, message: req.flash('passport') });
    
                          
});


// отдельная страница Dashboard для отчетов. ))
router.get('/report', function(req, res) {
    
//    log.debug('Flash: ' + req.flash('message'));
//    log.debug('Flash2: '+  req.flash('warning'));
//    

    res.render('report', { user: req.user, message: req.flash('passport'), warning: req.flash('warning') } );
                          
});


router.get('/about', function(req, res) {
    
    req.flash('message', 'my messages skdjfsjlfkj');
    req.flash('warning', 'important!');
            
    log.info('get about router');
    
    res.render('about', { user: req.user, message: req.flash('message'), warning: req.flash('warning')  });
                               
});

module.exports = router;
