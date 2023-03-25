//основной роутер принимающий запросы
'use strict';
const express                       = require('express');
const router                        = express.Router();
const log                           = require('../utils/log')(module);

// страница входа на сайт.
router.get('/', function(req, res) {
    res.render('index', { user: req.user, message: req.flash('message'), warning: req.flash('warning') });
});

// страница "о проекте"
router.get('/about', function(req, res) {
    req.flash('message', 'my messages skdjfsjlfkj');
    req.flash('warning', 'important!');
    log.info('get about router');
    res.render('about', { user: req.user });                           
});


// страница "о проекте"
router.get('/test', function(req, res) { 
    
    // нужно передавать error
    res.render('Error404', { error: 'тестовая ошибка'});
    
    
                               
});

module.exports = router;
