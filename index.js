

'use strict';

const nconf = require('nconf');
const path = require('path');


nconf.argv()
        .env()
        .file({ file: path.join(__dirname, 'config_dev.json')});

module.exports = nconf;


// TODO:  реализуй переменные окружения для настройки конфигурации