
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
 
     let id = req.params["id"];
         
     if (id) {
         
         log.debug('id==  ' + id);
         
        
        Task.TaskFindById(id, (err, callback) => {
            
            if (err) {

                //log.error("Ошибка ответа от базы данных - callback: " + err);
                 
                res.status(204).send('Ошибка от базы данных ' + err);

                 
              
            } else {
                
                log.debug(callback);
             
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
    
    // берем опции из запроса если есть
    if (req.params.option) {
        
        let option = req.params.option;
    }    
        // если нет то по умолчанию
        // все записи кроме закрытых работ status:closed или dateEnd = true
        
      let option = { status: { $ne: "closed" }, dateEnd: { $ne: true }};
      
        
//    log.debug(req);
//    log.debug(res);
//    
    
    
         /* // этот метод должен получать данные из БД
          * и передавать данные на страницу через res
          */
    
    Task.TaskFindAll(option, (err, data) => {
        
        if (err) {
            
            log.error(err);
            log.debug('taskfindall - error');
            res.render('JobList', {data: null, status: 'Error respond'});
        
        } else {
   
           log.info('task controller-TaskFindAll' );
        
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
      
      
      let id = req.body.id;
      
      log.info('id request' + id);
      
        // нужно разделить id и основные данные.
        
        
        
        


     // если передается id
     if (id) {
         
        
        // обновление данных
         log.info('controller update task');
                           
                           
         Task.TaskUpdate(id, task, (err, callback) => {

           if (err) {

                log.error(err);
                res.status(500).send('ошибка от базы данных ' + err);
                
                   
           } else {
               // здесь нужно получить успешные данные, но вернуть index ??
               // отобразить сообщение при помощи ajax ++ timeout
               //res.render('JobList', {data: callback, status: 'ok'});
               
                res.status(200).send('запись успешно изменена' + callback);               
           }
            
         });
         
     } else {
         //иначе создание записи
        log.debug('controller create task');

        
        Task.TaskCreate(task, (error, callback) => {
             
            if (error) {
                
                 log.error(error);
                 
                 //throw new Error ('получена ошибка');
                 
                 res.status(500).send('ошибка от базы данных ' + error);
                               
                 //res.render('JobList', {data: null, status: 'Error respond'});
                
             } else {
             
                 log.debug('task create if not error');
                 
                //тут наверное обновить информацию в окне без перезагрузки.
                res.status(200).send('запись создана успешно ' + callback);
                
                // как передать параметр во view??? 
                
                
                //res.send('/JobList/index');
                
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
    
    let id = req.body.id;

    
    
    Task.TaskDel(id, (err, callback) => {

        if (err) {

            log.error(err);
            res.status(500).send('ошибка от базы данных ' + err);
                
                   
        } else {
                             
                res.status(200).send('запись успешно удалена' + callback);               
        }
            
    });

    
    
    
    
};



// завершить задачу
exports.close = function(req, res) {
    
    log.debug("сработал вызов close в контроллере");
    
    // метод присваивает определенной задачи статус - завершена + ставит дату завершения.
    
    

    
    
    
    
};
