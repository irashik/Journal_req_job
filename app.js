/* 
 * основной входной файл приложения
 */


const express                       = require('express');
const router                        = require('./routes');
const workerRouter                  = require('./routes/worker');
const taskRouter                  = require('./routes/task');

const engine                        = require('ejs-mate');
const log                           = require('./utils/log')(module);
const config                        = require('./config');
const path                          = require('path');
const errorhandler                  = require('errorhandler');

const bodyParser                    = require('body-parser');
const logger                        = require('morgan');
const cookieParser                  = require('cookie-parser');

const livereload                    = require('livereload');
const server                        = livereload.createServer();


const mongoose                      = require('./utils/mongoose');
const session                       = require('express-session');
const connectMongo                  = require ('connect-mongo');

const HttpError                     = require('./error').HttpError;

//const passport                      = require('passport');
//const LocalStrategy                 = require('passport-local').Strategy;

const flash                         = require('connect-flash');
const cors                          = require('cors');
//const Account                       = require('./models/user');

const createError                   = require('http-errors');


//const middleware = require('./middleware')(app, express)

const app                           = express();


process.env.NODE_ENV = 'development';


server.watch(__dirname + "/public");




app.engine('ejs', engine);
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');



app.use(router);
app.use(workerRouter);
app.use(taskRouter);


app.use(express.static(path.join(__dirname, './public')));

//app.use(express.favicon('public/images/favicon.ico'));



app.use(cookieParser());

const sessionStore = require('./utils/sessionStore');


app.use(session({
    name: config.get('session:name'),
    secret: config.get('session:secret'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie'),
    store: sessionStore
    
    
    
}));



app.use(bodyParser.urlencoded({ 
    extended: false
}));

app.use(bodyParser.json());


app.use(require('./middleware/sendHttpError'));


app.use(flash());




if (process.env.NODE_ENV === 'development') {
    
    app.use(errorhandler());
    app.use(logger('dev'));
    
};





if(process.env.NODE_ENV === 'development') {

     
// обработка ошибок 404 - которые прошли через все обработчики.
app.use((req, res, next) => {
    
    return next(createError(404, "Ошибка 404"));
    
    res.json({
        message: req.message,
        message2: res.message
        
        
    });
    
    next();
    
});


// обработчики ошибок.2
app.use(function (err, req, res, next) {        // одного наверное достаточно.
      
        console.error(err.stack);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: err,
                error_status: err.status,
                stack: err.stack
                
            }
        });
    });







};




// ОБРАБОТЧИКИ ОШИБОК.

app.use(function(err, req, res, next) {
    log.debug("получено управление ОБРАБОТЧИК ОШИБОК");
    
    if (typeof err === 'number') {
        err = new HttpError(err);
        log.debug("запущен httpError");
        
    }
    
    if (err instanceof HttpError) {
        res.sendHttpError(err);
        log.debug("запущен sendHttpError");
       
    } else {
        
           if (app.get(NODE_ENV) === 'development') {
               log.debug("started errorHandler");
               express.errorHandler()(err, req, res, next);
               
               } else {
               log.error(err);
               err = new HttpError(500);
               res.sendHttpError(err);
                
            }
        
        } 
        
    
});



module.exports = app;
