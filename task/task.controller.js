
/*
 * Контроллер взаимодействует с представлением и моделью
 * Когда происходит событие, контроллер считывает данные и принимает решения о дальнейших действиях. 
 * сообщает представлению о том, что именно нужно вывести на странице. Контроллер берёт необходимые данные из модели и преобразует их в объект, с которым может работать представление
 * 
 */

'use strrict';

const Task                          = require('./task.model');
const log                           = require('../utils/log')(module);



// получи данные по конкретной задачи
exports.open = function(req, res, next) {
    log.debug("сработал вызов open в контроллере");
    let id = req.params["id"];
    let option = {}; // можно передать какие-нибудь опции
    if (id) {
        Task.TaskFindById(id, option, (err, callback) => {
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
    let option = new Object();
    let search_str = null;
    // берем опции из запроса если есть
    // Здесь всегда показываются все задачи кроме закрытых
      option.Status = { $ne: "Выполнено" };
    if(req.query.status) {
        // добавляем в статус поиск по запросу плюс оставляем условие по только активным задачам.
        option.Status = { $eq: req.query.status, $ne: "Выполнено"};
    }
    if (req.query.typetask) {
        option.TypeTask = req.query.typetask;
    }
    if (req.query.search) {
    
             // объект для запроса mongodb
              /**ищу по полям
               * { Name: , TypeTask: , Creator, Resource  - смотри индекс mongodb.
               */
         
         option.$text =  { $search: req.query.search };
         search_str = req.query.search;
    } 

         /* Получаем  все записи по запросу с опциями от модели
          * и передавать данные на страницу через res
          */
    Task.TaskFindAll(option, (err, data) => {
        if (err) {
            log.error(err);
            log.debug('taskfindall - error');
            res.render('JobList', {data: null, status: 'Error respond', user: req.user } );
        
        } else {
            log.debug('task controller-TaskFindAll' );
            res.render('JobList', { data: data, status: 'ok', id_task: null, search: search_str, user: req.user });
           
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
        let DateStart = new Date();
        
        let task_create = {
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
            
            Foto: {
                foto1: null,
                foto2: null,
                foto3: null,
                foto4: null,
                foto5: null
                
            }
            
        };
        
        
      
        let task_update = task_create;
        delete task_update.Foto;
        delete task_update.DateStart;
        
     // если передается id
    if (id) {
        // обновление данных
        Task.TaskUpdate(id, task_update, (err, callback) => {
            if (err) {
                log.error(err);
                res.status(500).send('ошибка от базы данных ' + err);
            } else {
                res.status(200).send('запись успешно изменена' + callback);               
            }
        });
    } else {
         //иначе создание записи
        Task.TaskCreate(task_create, (error, callback) => {
            if (error) {
                log.error(error);
                res.status(500).send('ошибка от базы данных ' + error);
            } else {
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



exports.DownloadFile = function(req, res, next) {
    
     /*
     * Функционал по закачке файла:
     * 
     * получи запрос
     * найди запись id используй
     * выдели blob данные из полученого ответа
     * передай файл клиенту
     * клиент его сам должен сохранить.
     */
    
    log.debug('сработал вызов DownloadFile');
        let id = req.params['id'];
        log.info('req.params.' + id);
        let fotoNum = req.params['fotoNum'];
        log.info('req.params.fotoNum=' + fotoNum);
        
        if (id) {
            // функция модели
            let promise = Task.FindAndDownload(id, fotoNum);
            promise
                .then(file => {
                        // загружается сразу бинарный объект.
                        let buffer = Buffer.from(file.Foto[fotoNum].buffer);
                        // отправляем blob объект клиенту.
                        res.send(buffer);
                })
                .catch(err => {
                        // возвращается если изображения нет. (файла нет).
                        log.error('error download === ' + err); 
                        res.status(500).send(err);
                        next();
                });
        } else {
            next();
        }
};


exports.UploadFile = function(req, res) {
     log.debug('сработал вызов UploadFile');
   
    /*
     * Функционал по выгрузке  файла на сервер:
     * 
     * получи запрос
     * найди запись id используй
     * получи файл  от клиента или несколько файлов
     * передай в модель эти файлы для записи в базу
     * верни ответ, что все хорошо. или ошибку.
     */
    
    
    
    
    let id = req.query['id'];
    log.info('req.query==' + id);
            
    if (id) {
        
        
        log.warn(req.files);
        
        
        // Это объект содержащий информацию о переданных файлах.
        let upFile = req.files.uploadedFile;
                // образец объекта.
            ////    warn: {
            ////  uploadedFile: {
            ////    name: 'file_0',
            ////    data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 01 01 2c 01 2c 00 00 ff e1 ce d8 45 78 69 66 00 00 49 49 2a 00 08 00 00 00 0e 00 0f 01 02 00 12 00 00 00 b6 00 ... 1967687 more bytes>,
            //    size: 1967737,
            //    encoding: '7bit',
            //    tempFilePath: '',
            //    truncated: false,
            //    mimetype: 'image/jpeg',
            //    md5: 'a489baf3c8183af4c6f225483634112f',
            //    mv: [Function: mv]
            //  }
            //}

            // если несколько файлов, то возращается такой объект не массив.
            /*[     { name: 'file_0', data: <Buffer bytes>, },
                    { name: 'file_1', data: <Buffer more bytes>,  },
                    { name: 'file_2', data: <Buffer  bytes>, } 
              ]
            */

        let file = upFile.data; // данные 
        let name = upFile.name; // имя файла - соответ модели foto1 ... foto6
        log.debug('upFile.name==' + name);
        
        let promise = Task.FindAndUpload(id, file, name);
        promise.then(doc => {
                log.debug("Данные от БД: " + doc);
                res.send(doc);
        })
        .catch(err => {
                log.error(err); 
                res.status(500).send(err);
        });
        
        
        
    } else {
        res.status(500).send('no id in req.');
    }
    
};

exports.DeleteFile = function(req, res, next) {
    /*
     * Функционал по удалению файла:
     * 
     * получи запрос
     * отправь в модель  id  && fotoNum для удаления
     * получи ответ
     * отправь ок или ошибку.
     */
    
    log.debug('сработал вызов DeleteFile');
    let id = req.params['id'];
    let fotoNum = req.params['fotoNum'];
       
    log.info('req.params.' + id);
    log.info('req.params.fotoNum=' + fotoNum);
        
    if (id) {
        // функция модели
        Task.FindAndDeleteFile(id, fotoNum)
            .then(result => {
                    log.info('deleteFile return doc==' + result);
                    res.send(result);
            })
            .catch(err => {
                    log.error(err); 
                    res.status(500).send(err);
            });
    
        } else {
            // сообщить что нет id || fotoNum
            res.status(500).send('no id || fotoNum');
        }
};
