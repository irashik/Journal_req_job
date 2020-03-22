/*
 * основной роутер принимающий запросы
 */
 'use strict';

const express        = require('express');
const router         = express.Router();




    
router.get('/', function(req, res) {
     res.render('index', {  });
                          
});




    
router.get('/report', function(req, res) {
     res.render('report', {  });
                          
});







module.exports = router;
