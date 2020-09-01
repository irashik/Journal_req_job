"use strict";

/* модуль настаривает конфигурацию для отправки емейла с сервера */

const nodemailer                    = require("nodemailer");
const config                        = require('./config');
const log                           = require('../utils/log')(module);

let mailConfig;

if (process.env.NODE_ENV === 'development') {
    
    
    
    let testAccount = nodemailer.createTestAccount();
    
    mailConfig = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
    };
    
    
    
};

if (process.env.NODE_ENV === 'production') {
    
    mailConfig = {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'D7271984@yandex.ru',
        pass: 'Dmitrii2013$'
      },
    };

};
    


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
    let transporter = nodemailer.createTransport(mailConfig);
    
    
    let message = {
        from: '"WebApp JournalReqJob" <D7271984@yandex.ru>', // sender address
        to: 'D7271984@yandex.ru',
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }
    
    let info = await transporter.sendMail(message);
    
    log.info("Message sent: %s", info.messageId);


}



module.exports.main = main;



main().catch(console.error);
