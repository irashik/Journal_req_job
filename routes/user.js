
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

//const passport                      = require('../middleware/passport');
const passport                      = require('passport');



userRouter.get('/register', userController.register);
userRouter.post('/register', userController.register_post);


userRouter.get('/login', userController.login);
userRouter.post('/login', passport.authenticate('local', { 
                    failureRedirect: '/login',
                    successRedirect: '/profile',
                    failureFlash: true
                }), userController.login_post);
                





userRouter.get('/logout', userController.logout);

userRouter.get('/forgot', userController.forgot);
userRouter.post('/forgot', userController.forgot_post);


userRouter.get('/profile',  authenticationMiddleware(), userController.profile);










module.exports = userRouter;