var express = require('express');

var frameworkRouter = require('./routes/framework');
var evaluationRouter = require('./routes/evaluation');
var reportRouter = require('./routes/report');

var app = express();

// Delegate routers for request data types
app.use('/framework', frameworkRouter);
app.use('/evaluation', evaluationRouter);
app.use('/report', reportRouter);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port, function() {
    console.log('Listening on ' + port);
});

/**
 * Normalize a port into a number, string, or false.
 * Taken from express-generator boilerplate
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
        // named pipe
        return val;
    }
  
    if (port >= 0) {
        // port number
        return port;
    }
  
    return false;
}