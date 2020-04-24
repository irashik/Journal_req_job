
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Worker                        = require('./worker.model');
const log                           = require('../utils/log')(module);
const model                         = require('./worker.model');




   // метод для получения всех работников
exports.index = function(req, res) {
    
    log.debug("сработал метод  index в контроллере ");
    let cursor = null;
    let status = null;
    
    /*
     * обратись к модели за данными
     * проверь что вернулось не null, и не ошибка, и если что - отрази сообщение.
     * выполни рендер
     * 
     */
    
      model.FindAllWorker((data, err) => {
          cursor = data;
          status = err;
      });     
    
    
    
    
    res.render('worker', { worker: cursor, status: status });
    
    
    
    
    
};



// методя для обновления данных работника
exports.saved = function(req, res) {
    
    /*
     * найти работника по id, забрать данные из запроса, проверить корректность, обновить поля (сохранить),
     * выдать сообщение об успешном сохранении.
     * 
     */
    log.debug("сработал вызов saved в контроллере");
    
    
    
    
};

// добавление данных в базу
exports.created = function(req, res) {
   
    /*
      * проверяем по фамилии, если работника еще нет в базе работаем, 
      * если есть передаем методу сохранения изменений.
      * Получаем данные из полей FirstName LastName LastName2 profession quality status comment
      */
    
    log.debug("сработал вызов added в контроллере");

    
    
    
    
    
};

// получи данные по конкретному работнику
exports.open = function(req, res) {
    
    
    
};
       

// удали работника по id
exports.del = function(req, res) {
    
    //получи id из запроса
       // вызови метод модели
           // получи ответ ок или ошибку.
    
    
    
};












let worker_Arr = ""; // массив данные работников.


function Update_info_dom() {
    
   let firstName  = document.getElemetnById('FirstName');
   let lastName   = document.getElemetnById('LastName');
   let profession = document.getElemetnById('Profession');
   let quality    = document.getElemetnById('Quality');
   let status     = document.getElemetnById('Status');
   let comment    = document.getElemetnById('Comment');
   
   log.debug("update_info_dom runing");
   
   
     // через request.body.FirstName
     // bodyParser

        // получаем данные из DOM
let worker_inf = {
         FirstName: firstName, 
         LastName: lastName
     };


}


 
        
        
        
        function WorkerAdd() {
    
    // получи данные из dom
   Update_info_dom();
    
    
           
   worker = new Worker(worker_inf);     
           
    worker.save(function (err) {
        if (err) return handleError(err);
        log.info('saved');
    });
    
};

exports.woker = function (req, res) {
    res.render('worker', {} );
    
};
