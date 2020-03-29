
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

const Task                          = require('./task.model');
const log                           = require('../utils/log')(module);




exports.index = function(req, res) {
    res.render('JobList', { });
    log.debug("сработал метод в контроллере ");
    
    
    
    
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
    
    
    const task = new Task();
    
    task.Name = Name;
    task.validate();
    await task.save();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
};


