
const config = require('./config');
const app = require('./app');
const log                           = require('./utils/log')(module);


const nconf = require('nconf');

app.listen(config.get('port'), function() {
    log.info('Express server is run ' + config.get('url') + ', listening on port ' + config.get('port'));
    
});

