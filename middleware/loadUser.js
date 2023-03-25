/*
 * Наверное этот модуль делает следующее:
 *  при вызове любого роутера, запрос проходит через данное мидлеваре
 *  оно проверяет есть ли запись в req.session.user какой нибудь пользователь
 *  Если запись есть то пропускает дальше обработчик
 *  Если записи нет, то он находит ее в базе 
 *  а полученное значение присваивает в req.user && req.locals.user
 */

const User                          = require('../user/user.model');
const log                           = require('../utils/log')(module);



module.exports = function(req, res, next) {
    
    req.user = res.locals.user = null;  // зачем это - чтобы исключить наложение (повторное использование)??
    
    if (!req.session.user) return next();
    
    User.findById(req.session.user, function(err, user) {
        if (err) return next (err);
        req.user = res.locals.user = user;
        next();
    });
    
};
