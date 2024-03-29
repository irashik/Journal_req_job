
/*роутер принимает запросы относящиеся к аутентификации и профилю пользователя
 * 
 */
'use strict';

const express                       = require('express');
const userRouter                    = express.Router();
const log                           = require('../utils/log')(module);
const userController                = require('../user/user.controller');
const authenticationMiddleware      = require('../middleware/auth');
const config                        = require('../config');


// проверка - подтверждение емейла пользователем
userRouter.get('/register/verife/:hash', userController.userVerife);

// подтсврждение пользователя администратором.
        //чтобы не строить сложную проверку доступа админа
           // путь будет секретным
userRouter.get('/register/' + config.get('confirmKey') + '/:hash', userController.userConfirm);




userRouter.get('/register', userController.register);
userRouter.post('/register', userController.register_post);

userRouter.get('/login', userController.login);
userRouter.post('/login', userController.login_post);
                    


userRouter.get('/logout', userController.logout);

userRouter.get('/forgot', userController.forgot);
userRouter.post('/forgot', userController.forgot_post);


userRouter.get('/profile',  authenticationMiddleware(), userController.profile);
userRouter.patch('/profile',  authenticationMiddleware(), userController.profileChange);

//КОНТРОЛЛЕР ДЛЯ ИЗМЕНЕНИЯ ПАРОЛЯ
userRouter.patch('/profile/passw',  authenticationMiddleware(), userController.changePassw);








module.exports = userRouter;