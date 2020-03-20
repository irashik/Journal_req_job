/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express                       = require('express');
const app                           = express();
const routes                        = require('./routes/index');

const engine                        = require('ejs-mate');
const log                           = require('./utils/log')(module);



app.engine('ejs', engine);

app.set('view', __dirname + "/view");
app.set('view engine', 'ejs');

app.listen(config.get('port'), function() {
    log.info('Express server listening on port ' + config.get('port'));
    
});



