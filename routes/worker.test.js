'use strict';
/*
 * тестирование роутера Worker
 */

const chai             = require('chai');
const assert           = chai.assert;
const expect           = chai.expect;
const should           = require('should');
const chaiAsPromised   = require('chai-as-promised');
const sinon            = require('sinon');
const _                = require ('lodash');
const log              = require('../utils/log')(module);
const request          = require('supertest');
const router       = require('./worker');

chai.use(chaiAsPromised);


//const express                       = require('express');
//const workerRouter                  = express.Router();
//
//
//const workerController = require('../worker/worker.controller');

//// добавление работника в базу данных.
//workerRouter.post('/worker/add', workerController.created);
//
//// обновление информации о работнике
//workerRouter.post('/worker/saved', workerController.saved);
//
//// получение данных по всем работникам.
//workerRouter.get('/worker', workerController.index);
//
//// получить данные по конкретному работнику
//workerRouter.get('/worker/open', workerController.open);
//



describe('тестирование роутера Worker', () => {
    
    it('Test route created', () => {
     
      //workerRouter.post('/worker/add', workerController.created);
         request(app)
                 .get('worker/add')
                 .expect('Content-Type', 'http')
                 .expect(200, 'ok')
                 .end((err, res) => {
                     if (err) throw err;
             
         });
         
       // router.WorkerRouter.post('/worker/add')
   });
});