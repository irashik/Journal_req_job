
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Timesheet                        = require('./timesheet.model');
const log                           = require('../utils/log')(module);



// получи данные по конкретной записи
exports.open = function(req, res, next) {
    
     log.debug("сработал вызов open в контроллере");
 
    
    
    
     let id = req.params.id;
    
//     if (id) {
//    
//        
//         Worker.WorkerOpen(id, (callback, err) => {
//            
//              if (err) {
//
//                 log.error("Ошибка ответа от базы данных - callback: " + err);
//                 res.render('worker', { status: "Error response Database", info: err }); 
//              
//        } else {
//             
//             log.debug("id найден");
//             res.render('worker', { status: 'Данные получены', info: callback });
//        
//        };
//            
//        });
//        
//    } else {
//        
//        // todo
//        // кому передаем управление?? наверное /worker/ index.
//        next();
//        
//    }
    
    
};



   // метод для получения всей информации
exports.index = function(req, res) {
    
    log.debug("сработал метод  index в контроллере ");
    
    
    
   
    
    /*
     * обратись к модели за данными
     * проверь что вернулось не null, и не ошибка, и если что - отрази сообщение.
     * выполни рендер
     * 
     */
    
//     TimeSheet.FindAllTimeSheet((data, err) => {
//          
//         res.render('TimeSheet', {  });
//
//          
//      });     
    

             res.render('TimeSheet', {  });

    
  
    
    
    
    
    
};



// методя сохранения информации в табеле
exports.saved = function(req, res) {
    
    /*
     * найти работника по id, забрать данные из запроса, проверить корректность, обновить поля (сохранить),
     * выдать сообщение об успешном сохранении.
     * 
     */
    log.debug("сработал вызов saved в контроллере");
    
    
    
    
};

// добавление данных в базу
exports.created = function(req, res) { // next??
   
    /*
      *  todo // проверяем по фамилии, если работника еще нет в базе работаем, 
      *          если есть передаем методу сохранения изменений.
      * Получаем данные из полей FirstName LastName LastName2 profession quality status comment
      * 
      * 
      * получи ответ от модели со статусом = ок или error;
      */
     log.debug("сработал вызов created в контроллере");
     
//    
//    Worker.WorkerCreate(req, (callback) => {
//        
//        
//        if (callback !== null || undefined) {
//            // здесь нужно передать данные через аякс в модальное окно.
//            log.debug("запись создана в базе");
//            
//             res.render('worker', { status: callback});
//        } else {
//            
//             res.render('worker', { status: "Error response Database"}); 
//             log.error("Ошибка ответа от базы данных - callback: " + callback);
//        };
//        
//    });
//    
    
    
    
    
    
    
};