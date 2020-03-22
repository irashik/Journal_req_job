
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Worker                        = require('./worker.model');
const log                           = require('../utils/log')(module);




exports.index = function(req, res) {
    res.render('worker', { worker: "" });
    log.debug("сработал метод в контроллере ");
    
    
    
    
};




exports.saved = function(req, res) {
    log.debug("сработал вызов saved в контроллере");
    
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


// добавление данных в базу
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
