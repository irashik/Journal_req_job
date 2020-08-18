/* 
 * основной входной файл приложения
 */
'use strrict';

const express                       = require('express');

const router                        = require('./routes');
const workerRouter                  = require('./routes/worker');
const taskRouter                    = require('./routes/task');
const journalRouter                 = require('./routes/journal');
const timesheetRouter               = require('./routes/timesheet');
const userRouter                    = require('./routes/user');

const engine                        = require('ejs-mate');
const log                           = require('./utils/log')(module);
const config                        = require('./config');
const path                          = require('path');
const errorhandler                  = require('errorhandler');

const bodyParser                    = require('body-parser');
const logger                        = require('morgan');
const cookieParser                  = require('cookie-parser');
const livereload                    = require('livereload');

const session                       = require('express-session');
const HttpError                     = require('./error').HttpError;


//PassportJS
const passport                      = require('passport');
// подключение стратегии passport
const myPassport                    = require('./middleware/passport');
//const myPassportGoogle              = require('./middleware/google-strategy');



const sessionStore                  = require('./utils/sessionStore');
const flash                         = require('connect-flash');
const cors                          = require('cors');
const createError                   = require('http-errors');


//const middleware = require('./middleware')(app, express)

const app                           = express();
const server                        = livereload.createServer();


process.env.NODE_ENV = 'development';


server.watch(__dirname + "/public");




app.engine('ejs', engine);
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ 
    extended: false
}));

app.use(bodyParser.json());




 



app.use(cookieParser());

app.use(session({
    name: config.get('session:name'),
    secret: config.get('session:secret'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie'),
    store: sessionStore
    
    
    
}));

app.use(flash());


app.use(passport.initialize());
app.use(passport.session());



//////////#####################3
app.use(router);
app.use(workerRouter);
app.use(taskRouter);
app.use(journalRouter);
app.use(timesheetRouter);
app.use(userRouter);




app.use(express.static(path.join(__dirname, './public')));

//todo найди какой ни будь значек для приложения
//app.use(express.favicon('public/images/favicon.ico'));


app.use(require('./middleware/sendHttpError'));

app.use(require('./middleware/loadUser')); // не может прочитать свойство user

app.use(require('./middleware/auth'));  // так не хочет подключать.









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
