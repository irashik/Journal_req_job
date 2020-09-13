
/*
 * 
 * роутер принимает запросы относящиеся к аутентификации и профилю пользователя
 * 
 */
'use strict';

const express                       = require('express');
const userRouter                    = express.Router();
const log                           = require('../utils/log')(module);
const userController                = require('../user/user.controller');

const authenticationMiddleware      = require('../middleware/auth');

//const passport                      = require('passport');
const passport                      = require('../middleware/passport');


// проверка - подтверждение емейла пользователем
userRouter.get('/register/verife/:hash', userController.verife);
// подтсврждение пользователя администратором.
userRouter.get('/register/confirm/:hash', userController.confirm);

userRouter.get('/register', userController.register);
userRouter.post('/register', userController.register_post);

userRouter.get('/login', userController.login);
userRouter.post('/login', passport.authenticate('local', { 
                    successRedirect: '/',
                    failureFlash: true,
                    successFlash: true
}));

userRouter.get('/logout', userController.logout);

userRouter.get('/forgot', userController.forgot);
userRouter.post('/forgot', userController.forgot_post);


userRouter.get('/profile',  authenticationMiddleware(), userController.profile);
userRouter.PATH('/profile',  authenticationMiddleware(), userController.profileChange);
//КОНТРОЛЛЕР ДЛЯ ИЗМЕНЕНИЯ ПАРОЛЯ
userRouter.PATH('/profile/passw',  authenticationMiddleware(), userController.changePassw);














module.exports = userRouter;