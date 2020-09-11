
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

'use strrict';

const Report                          = require('./report.model');
const log                           = require('../utils/log')(module);
const Task                          = require('../task/task.model');
const moment                        = require('moment');


/* Открытие модального окна происходит по 
 * контроллеру task.controller
 * 
 */

// библиотека для форматирование времени, а это применение локали ru
moment.locale('ru');


// Открытие Dashbouard для отчетов.
exports.index = function(req, res) {
    log.debug("сработал метод index");
    
    log.warn('req.query:: ' + JSON.stringify(req.query));
    
    //log.debug('Flash: ' + req.flash('message'));
    //log.debug('Flash2: '+  req.flash('warning'));
    
    let option = new Object();
    
    if(req.query.TypeTask) {
        option.TypeTask = req.query.TypeTask;
    }
    if(req.query.Status) {
        option.Status = req.query.Status;
    }
    if (req.query.Creator) {
        option.Creator = req.query.Creator;
    }
    
    
    // проверка выбраных значение Resource и формируем запрос
    if (req.query.Resource) { 
        let resource_str;
        switch(req.query.Resource) {
            case '1':  
                // не пустое и не null
                // option.$or = [ {Resource: { $ne: null} }, {Resource: {$ne: ""}} ]; // так почему то не работает
                option.$or = [ {Resource: { $ne: ''}} ];
                break;
            case '2':
                log.debug('Resouce == 2');
                // только пустые или null
                option.$or = [ {Resource: null}, {Resource: ''}];
                break;
            }
        }
        
        
    
    
    // адаптация запросов даты
      
//    if(dateS1)
//        if(dateS2)
//            if(dateE1)
//                if(dateE2)
//                    
     
//    
    
    if (req.query.DateStart1 && req.query.DateStart2) {
        option.$and = [ {DateStart: { $gte: req.query.DateStart1}},
                        {DateStart: {$lte: req.query.DateStart2}}];
    } 
    else if (req.query.DateStart1) {
            option.DateStart = { $gte: req.query.DateStart1 };
    }
    else if (req.query.DateStart2) {
           option.DateStart = { $lte: req.query.DateStart2 };
    }
  
  
  
    if (req.query.DateEnd1 && req.query.DateEnd2) {
        option.$and = [ {DateEnd: { $gte: req.query.DateEnd1}},
                        {DateEnd: {$lte: req.query.DateEnd2}}];
    } 
    else if (req.query.DateEnd1) {
            option.DateEnd = { $gte: req.query.DateEnd1 };
    }
    else if (req.query.DateEnd2) {
           option.DateEnd = { $lte: req.query.DateEnd2 };
    }
  
       
    
  
        
    log.debug('query option:  ' + JSON.stringify(option));
    
    Task.TaskFindAll(option, (err, data) => {
        
        if (err) {
            log.error(err);
            log.debug('taskfindall - error');
            // todo нужно рендерить окошко об ошибке
            res.render('Report', { data: {}, status: 'Error respond', user: req.user, message: req.flash('message'), warning: req.flash('warning') } );
            
            
        
        } else {
            
            log.debug('Report controller - findTask sucessfully');
            res.render('Report', { data: data, status: 'ok', user: req.user, message: req.flash('message'), warning: req.flash('warning'), moment: moment } );
  
        }
        
        
    });
    
    
};

