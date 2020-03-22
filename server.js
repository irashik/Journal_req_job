/*
 * скрипт запуска сервера
 */

const config                        = require('./config');
const app                           = require('./app');
const log                           = require('./utils/log')(module);



app.listen(config.get('port'), function() {
    log.info('Express server is run, listening on port ' + config.get('port'));
    
});

