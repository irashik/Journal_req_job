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
    
    it ('проверка подключения к бд', function() {
        
        //todo:
    });
    
    
    it('Тестирование метода FindAllWorker', () => {
       
    Worker.FindAllWorker((data, status) => {
       
            
            should(data).be.true;
            
            
    });    
        
        
        
    });
    
});
