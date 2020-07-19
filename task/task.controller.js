
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
    
     //log.debug("сработал вызов open в контроллере");
 
     let id = req.params["id"];
         
     if (id) {
            //log.debug('id==  ' + id);
        
        Task.TaskFindById(id, (err, callback) => {
            if (err) {
                //log.error("Ошибка ответа от базы данных - callback: " + err);
                res.status(500).send('Ошибка от базы данных ' + err);
                
                //todo наверное другой код ошибки
                
              
            } else {
                //log.debug(callback);
                res.status(200).send(callback);
            };
            
        });
        
    } else {
        
            next();
        
    }
    
};



// получение всех данных для списка.
exports.index = function(req, res) {
    
    log.debug("сработал метод index");
    
    let option;
    // берем опции из запроса если есть
    
    if (req.params.option) {
        log.info('req.params.option: ' + req.params.option);
         option = req.params.option;
    } else {
        option = { 
            Status: { $ne: "Выполнена" }
        
        };
        //option = { status: true };
        
    }
        // если нет то по умолчанию
        // все записи кроме закрытых работ status:closed или 
        
        log.debug('option:  ' + option);
                         
         /* // этот метод должен получать данные из БД
          * и передавать данные на страницу через res
          */
    
    Task.TaskFindAll(option, (err, data) => {
        
        if (err) {
            log.error(err);
            log.debug('taskfindall - error');
            res.render('JobList', {data: null, status: 'Error respond'});
        
        } else {
            log.debug('task controller-TaskFindAll' );
            res.render('JobList', { data: data, status: 'ok', id_task: null });
           
        }
        
        
    });
    
    
};



// обновление данных в модели
exports.saved = function(req, res) {
    
    log.debug("сработал вызов saved в контроллере");
        
    // нужно реализовать меток created && saved в данном методе.
    
     // если id нет то создать запись если есть, то найти и обновить.
     
     // нужно взять информацию из запроса
             // потому что нужно разделить id и основные данные.

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

        let id = req.body.id;
     
      
        let task = {
            DateStart: DateStart,
            Name: Name,
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
            
        };
      
      
      
        log.info('id request:  ' + id);
      


     // если передается id
     if (id) {
        // обновление данных
        log.info('controller update task');
                           
        Task.TaskUpdate(id, task, (err, callback) => {
            if (err) {
                log.error(err);
                res.status(500).send('ошибка от базы данных ' + err);
                                   
            } else {
                res.status(200).send('запись успешно изменена' + callback);               
            }
            
        });
         
     } else {
         //иначе создание записи
        log.debug('controller create task');
        
        Task.TaskCreate(task, (error, callback) => {
            if (error) {
                 log.error(error);
                 res.status(500).send('ошибка от базы данных ' + error);
               
            } else {
                log.debug('task create if not error');
                res.status(200).send('запись создана успешно ' + callback);
                
            }
             
        });
         
     };
    
    
};





// удалить задачу
exports.del = function(req, res) {
    /*
     * получить id удаляемой задачи
     * передать ее в функцию модели
     * вернуть результат
     */
    
    log.debug("сработал вызов del в контроллере");
    
    let id = req.params["id"];

    log.info('request id:  ' + id);
    
    Task.TaskDel(id, (err, callback) => {
        if (err) {
            log.error(err);
            res.status(500).send('ошибка от базы данных ' + err);
                   
        } else {
            log.debug('запись удалена:  ' + callback);
            res.status(200).send('запись успешно удалена' + callback);               

        }
    
    });

    
};



