var express = require('express');
var bodyParser = require('body-parser');
var frameworkRouter = require('./routes/framework');
var evaluationRouter = require('./routes/evaluation');
var reportRouter = require('./routes/report');
var userRouter = require('./routes/user');

var app = express();

//Set up cross-domain access 
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// Setup middleware for parsing POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Delegate routers for request data types
app.use('/framework', frameworkRouter);
app.use('/evaluation', evaluationRouter);
app.use('/report', reportRouter);
app.use('/user', userRouter);


var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

app.listen(port, function () {
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