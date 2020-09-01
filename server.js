/*
 * скрипт запуска сервера
 */

const config                        = require('./config');
const app                           = require('./app');
const log                           = require('./utils/log')(module);

const nconf = require('nconf');


 // Переменная окружения
process.env.NODE_ENV = 'development';


nconf.set('process.env.NODE_ENV', 'development');




app.listen(config.get('port'), function() {
    log.info('Express server is run, listening on port ' + config.get('port'));
    
});

