
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

'use strrict';

const Task                          = require('./task.model');
const log                           = require('../utils/log')(module);




exports.index = function(req, res) {
    
    log.debug("сработал метод в контроллере ");
    
    
    
         /* // этот метод должен получать данные из БД
          * и передавать данные на страницу через res
          */
    
    Task.find(function (err, tasks) {
        if (err) return log.error(err);
        log.info(tasks);
        
        res.render('JobList', { tasks });
    });
    
    
};


exports.saved = function(req, res) {
    log.debug("сработал вызов saved в контроллере");
    
};



exports.add = async function(req, res) {
    log.debug("сработал вызов add в контроллере");
    
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
      let Foto = req.body.Foto; // как корре
    
    
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
    
    
    task.validate();
    
    
    task.save()
            .then(function(doc) {
                log.info('mongodb object is saved: ' + doc);
            })
            .catch(function (err) {
                log.error(err);
            });    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
};


