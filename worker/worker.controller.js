
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Worker                        = require('./worker.model');
const log                           = require('../utils/log')(module);




   // метод для получения всех работников
exports.index = function(req, res) {
    
    log.debug("сработал метод  index в контроллере ");
        
    /*
     * обратись к модели за данными
     * проверь что вернулось не null, и не ошибка, и если что - отрази сообщение.
     * выполни рендер
     */
    
     Worker.FindAllWorker((data, err) => {
         
          if (err) {
        
            log.error("Ошибка ответа от базы данных - callback: " + err);
            
            res.render('worker', { data: null, status: "Error response Database" }); 
             
        
        } else {
            
             log.debug('сработал res render');
             res.render('worker', { data: data, status: "ok" });
         
         
        } 
            
        
      });     
    
    
    
};



// методя для обновления данных работника
exports.saved = function(req, res) {
    
    /*
     * найти работника по id, забрать данные из запроса, проверить корректность, обновить поля (сохранить),
     * выдать сообщение об успешном сохранении.
     * 
     */
    log.debug("сработал вызов saved в контроллере");
    
    const id = req.params.id;
    const data = req.params.body;
    
    Worker.WorkerSaved(id, data, (callback, err) => {
        
        
        if (err) {

              log.error("Ошибка ответа от базы данных - callback: " + err);
            
              res.render('worker', { status: "Error response Database", info: err }); 
              
        } else {
             
             log.debug("запись в базе обновлена");
            
             res.render('worker', { status: 'Данный обновлены', info: callback });
        
        };
        
    });
    
    
    
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
     
    
    Worker.WorkerCreate(req, (callback) => {
        
        
        if (callback !== null || undefined) {
            // здесь нужно передать данные через аякс в модальное окно.
            log.debug("запись создана в базе");
            res.render('worker', { status: callback});
            
        } else {
            
             res.render('worker', { status: "Error response Database"}); 
             log.error("Ошибка ответа от базы данных - callback: " + callback);
        };
        
    });
    
    
    
    
    
    
    
};

// получи данные по конкретному работнику
exports.open = function(req, res, next) {
    let id = req.params.id;
    
    if(id) {
        //todo
    } else {
        
        // кому передаем управление?? наверное /worker/ index.
        next();
        
    }
    
    
};
       











let worker_Arr = []; // массив данные работников.


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
