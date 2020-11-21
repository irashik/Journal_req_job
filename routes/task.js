
/*
 * 
 * роутер принимает запросы по запросам /task
 * и перенаправляет их контроллеру.
 */
'use strict';

const express                       = require('express');
const taskRouter                    = express.Router();
const log                           = require('../utils/log')(module);
const taskController                = require('../task/task.controller');




taskRouter.get('/JobList/:id', taskController.open);

// удаление задачи
taskRouter.delete('/JobList/:id', taskController.del);


taskRouter.get('/JobList', taskController.index);


//добавление новой задачи + изменение существующей
taskRouter.post('/JobList/saved', taskController.saved); // поменять на put или см. ниже.

//todo   // изменение задачи
//taskRouter.put('/JobList/saved', taskController.update);


// работа с изображениями
taskRouter.post('/JobList/Foto', taskController.UploadFile);
taskRouter.get('/JobList/Foto/:id/:fotoNum', taskController.DownloadFile);
taskRouter.delete('/JobList/Foto/:id/:fotoNum', taskController.DeleteFile);



module.exports = taskRouter;