"use strict";

/* модуль настаривает конфигурацию для отправки емейла с сервера */

const nodemailer                    = require("nodemailer");
const config                        = require('../config');
const log                           = require('../utils/log')(module);


// создаем конфигурацию smtp transporter object
        // данные подтягиваются из конфигурациионного файла в зависимости от NODE_ENV
let mailConfig = {
      host: config.get('emailsend:host'),
      port: config.get('emailsend:port'),
      secure: config.get('emailsend:secure'),
      auth: {
        user: config.get('emailsend:user'),
        pass: config.get('emailsend:password')
      }
    };


// создаю транспорт
let transport = nodemailer.createTransport(mailConfig);


function main(message, respond) {
  
    transport.sendMail(message)
        .then(info => {
    
            respond(null, [info.messageId, info.response]);
        
    
    })
        .catch(err => {
            respond(err, null);
    });
    
    


}



module.exports = main;