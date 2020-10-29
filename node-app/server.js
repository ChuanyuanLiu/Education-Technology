/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used as the entry point of all routes used in this project
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

// Import the required modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');
var frameworkRouter = require('./routes/framework');
var evaluationRouter = require('./routes/evaluation');
var reportRouter = require('./routes/report');
var userRouter = require('./routes/user');

var app = express();

/**
 * @description Set up cross-domain access 
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**
 * @description Setup middleware for parsing POST requests
 */ 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * @description Delegate routers for request data types
 */ 
app.use('/framework', frameworkRouter);
app.use('/evaluation', evaluationRouter);
app.use('/report', reportRouter);
app.use('/user', userRouter);

/**
 * @description Set the port listened
 */ 
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * @description Listen on a defined port
 */ 
app.listen(port, function () {
    console.log('Listening on ' + port);
});
// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// }, app)
// .listen(port, function () {
//     console.log('Listening on ' + port);
// })

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