/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Journal                       = require('./journal.model');
const log                           = require('../utils/log')(module);

exports.open = function(req, res, next) {
    
    log.debug("метод journal.open");
        
     let id = req.params["id"];
         
     if (id) {
            
//        
////        Task.TaskFindById(id, (err, callback) => {
////            if (err) {
////                //log.error("Ошибка ответа от базы данных - callback: " + err);
//                res.status(500).send('Ошибка от базы данных ' + err);
//                
//                //todo наверное другой код ошибки
//                
//              
//            } else {
//                //log.debug(callback);
                res.status(200).send('callback');
//            };
            
        
        
    } else {
        
        next();
        
    }
};







    // получение всех данных для списка.
exports.index = function(req, res) {
    
    log.debug("сработал метод index в контроллере ");
       
         /* // этот метод должен получать данные из БД
          * и передавать данные на страницу через res
          */
        res.render('journal');
    
};

// обновление данных в модели
exports.saved = function(req, res) {
    
    log.debug("сработал вызов saved в контроллере");
    
};




// создать новую запись
exports.created = function(req, res) {
    
    log.debug("сработал вызов created в контроллере");
    
};

exports.delete = function(req, res) {
    
    log.debug('method delete');
    
};





