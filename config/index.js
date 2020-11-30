// файл настройки конфигурации приложения.

'use strict';

const nconf = require('nconf');
const path = require('path');
const log                           = require('../utils/log')(module);



switch (process.env.NODE_ENV) {
    
    case 'development':
        nconf.argv()
            .env()
            .file({ file: path.join(__dirname, 'config_dev.json')});
        
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

        process.env.NODE_ENV = 'development';
        log.info('Default!!! Выбрана конфигурация development по default');

    break;



};


log.info('process.env.NODE_ENV:  ' + process.env.NODE_ENV);



module.exports = nconf;


// TODO:  реализуй переменные окружения для настройки конфигурации
