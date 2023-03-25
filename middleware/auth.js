// midellware проверяет аутентификацию
function authenticationMiddleware() {
         
    return function(req, res, next) {

        if (req.isAuthenticated()) {
            
            return next();
        }
        req.flash('warning', 'Для начала зарегайтесь');
        res.redirect('/login');
    };
};

module.exports = authenticationMiddleware;
