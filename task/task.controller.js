
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

'use strrict';

const Task                          = require('./task.model');
const log                           = require('../utils/log')(module);





// получи данные по конкретному работнику
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
//    
    
};



// получение всех данных для списка.
exports.index = function(req, res) {
    
    log.debug("сработал метод index");
    
    
    
         /* // этот метод должен получать данные из БД
          * и передавать данные на страницу через res
          */
    
    Task.TaskFindAll((data, err) => {
        
        if (err) {
            log.error(err);
            log.debug('taskfindall - error');
            res.render('JobList', {data: null, status: 'Error respond'});
        
        } else {
   
           log.info('task controller-TaskFindAll' + JSON.stringify(data));
        
           res.render('JobList', { data: data, status: 'ok' });
           
        }
        
        
    });
    
    
};




// обновление данных в модели
exports.saved = function(req, res) {
    
    log.debug("сработал вызов saved в контроллере");
    
    
    // нужно реализовать меток created && saved в данном методе.
    
     // если id нет то создать запись если есть, то найти и обновить.
     
     // нужно взять информацию из запроса
      let DateStart = req.body.DateStart;
      let Name = req.body.Name;
      let Profession = req.body.Profession;
      let ExpenseTime = req.body.ExpenseTime;
      let Description = req.body.Description;
      let Resource = req.body.Resource;
      let TypeTask = req.body.TypeTask;
      let Status = req.body.Status;
      let Priority = req.body.Priority;
      let DateEnd = req.body.DateEnd;
      let Responsible = req.body.Responsible;
      let Creator = req.body.Creator;
            //TODO доработай чтобы можно загрузить фото.
      let Foto = req.body.Foto; 
     
     
     // если передается id
     if(req.params.id) {
         // обновление данных
         
         
         
     } else {
         //создание записи
         
         Task.TaskCreate((data, callback, error) => {
             
             if (error) {
                
                 log.error(err);
                 res.render('JobList', {data: null, status: 'Error respond'});
                
             } else {
             
                 log.info('task controller-Task.saved --> create' + JSON.stringify(data));
                 
                 // тут наверное обновить информацию в окне без перезагрузки.
                 res.render('JobList', { data: data, status: 'ok' });
                
             }
             
             
         });
         
         
     }
     
    
    
    
    
    const task = new Task({
                
        Name: Name,
        DateStart: DateStart,
        Profession: Profession,
        ExpenseTime: ExpenseTime,
        Description: Description,
        Resource: Resource,
        TypeTask: TypeTask,
        Status: Status,
        Priority: Priority,
        DateEnd: DateEnd,
        Responsible: Responsible,
        Creator: Creator,
        Foto: Foto
        
        
     });
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    


    
    
};





// удалить задачу
exports.del = function(req, res) {
    
    log.debug("сработал вызов del в контроллере");
    
    
    
    
    
    
};



// завершить задачу
exports.close = function(req, res) {
    
    log.debug("сработал вызов close в контроллере");
    
    // метод присваивает определенной задачи статус - завершена + ставит дату завершения.
    
    
    
    
    
    
};
