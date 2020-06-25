/*
 * тестирование файла worker.model.js
 * 
 * 
 */


'use strict';


const chai             = require('chai');
const assert           = chai.assert;
const expect           = chai.expect;

const should           = require('should');
const chaiAsPromised   = require('chai-as-promised');
const sinon            = require('sinon');
const _                = require ('lodash');

const log                           = require('../utils/log')(module);



const Worker                        = require('./worker.model');



chai.use(chaiAsPromised);



describe("Test модуля worker.model Test1", function() {
    
       
       
    it.only('Тестирование метода WorkerCreate', () => {
        
        const data = { 

                            FirstName: "Юферов",
                            LastName: "Александр",
                            LastName2: "Олегович",
                            profession: "Электрогазосварщик",
                            quality: 3,
                            status: null,
                            comment: null,
                            dismissal: null
            };
        
       
    Worker.WorkerCreate(data, (callback) => {
       
                   should(callback).be.true;
                   log.info(callback);
            
     });
            
            
            
            
    });    
    
    
    
     
    
    it('Тестирование метода FindAllWorker', () => {
       
    Worker.FindAllWorker((data, status) => {
       
            log.info(data);
            should(data).be.true;
            
            
            
            
    });    
    
    
    
    
   
    
    
});

        it('Method WorkerSaved', () => {
            
            //Обновление данных о работнике
            
            const worker = null; // id работника
            
            const data = { 

                            FirstName: "Юферов",
                            LastName: "Александр",
                            LastName2: "Олегович",
                            profession: "Сварщик",
                            quality: 5,     
                            status: null,
                            comment: null,
                            dismissal: null
            };
            
            
            Worker.WorkerSaved(worker, data, (callback, err) => {
                
                        log.info(callback);
                        should(data).be.true;
                        should(err).be.false;
                        
                        
                        
            });
        });

});