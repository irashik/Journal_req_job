// тест для тестирование  task.model.js

'use strict';



const chai             = require('chai');
const assert           = chai.assert;
const expect           = chai.expect;
const should           = require('should');
const chaiAsPromised   = require('chai-as-promised');
const chaiHttp         = require('chai-http');
const httpMocks        = require('node-mocks-http');
const sinon            = require('sinon');
const _                = require ('lodash');
const log              = require('../utils/log')(module);

//const shouldSinon       =
        require('should-sinon');

const db                      = require('../utils/mongoose');
const mongoose                = require('mongoose');
let Schema                    = mongoose.Schema;


const User                    = require('./user.model.js');





chai.use(chaiAsPromised);
chai.use(chaiHttp);





describe("Test модуля user.controller", function() {
    
    describe("method verife", () => {
        
        
        it('standart behavior', function() {
                 
                                
      
                
        });
        
        
        
       
                  
                 
                                
      
                
        });

           
        

   
         

    
    
    
    describe('method confirm', () => {
       
        it('standart behavior', () => {
           
           
            
                
        });
            
        
        
        
    });
    
    
    
     
    
    
    
    
         
///////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
        