// файл настройки конфигурации приложения.

'use strict';

const nconf = require('nconf');
const path = require('path');
const log                           = require('../utils/log')(module);


// если переменная равна development то выбираем конфигурацию



log.info('node_env0:  ' + nconf.get('NODE_ENV'));




switch (process.env.NODE_ENV) {
    
    case 'development':
        nconf.argv()
            .env()
            .file({ file: path.join(__dirname, 'config_dev.json')});
    
    log.info('выбрана конфигурация development');
    
    break;
    
    
    case 'production': 
         nconf.argv()
            .env()
            .file({ file: path.join(__dirname, 'config_prod.json')});
    
    break;
        
    case 'testing':
        nconf.argv()
            .env()
            .file({ file: path.join(__dirname, 'config_test.json')});
    
    break;
        
    default:
        nconf.argv()
            .env()
            .file({ file: path.join(__dirname, 'config_dev.json')});
    break;



};


log.info('node_env:  ' + process.env.NODE_ENV);



module.exports = nconf;


// TODO:  реализуй переменные окружения для настройки конфигурации

/// bla bla bla