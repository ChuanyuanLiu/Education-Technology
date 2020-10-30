/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used as an util to help with interacting with MySQL
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

 //Import mysql module
var mysql = require('mysql');      

/**
* @description Setup config of MySQL connection.
* @param {string} host - define the host of MySQL
* @param {string} user - define the username of MySQL
* @param {string} password - define the password of MySQL
* @param {string} database - define the database used in MySQL
* @param {boolean} multipleStatements - define whether allow multiple Statements excuted in 1 SQL call
* @param {string} timezone - define the timezone used in MySQL
*/
var mySqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'edtechevaluation',
    database: 'edtech',
    multipleStatements: true, //Enable mutiple SQL statements
    timezone: "10:00" //Set Time Zone as +10:00
};

var connection;

/**
 * @description Connect to the database while handling timeouts.
 */
function connectWithTimeoutHandling() {
    connection = mysql.createConnection(mySqlConfig);

    connection.connect(function (err) {
        if (err) {
            console.log("MySQL database down. Reconnecting...", err);
            setTimeout(connectWithTimeoutHandling, 2000);
        }
    });

    connection.on('error', function (err) {
        console.log("MySQL database timed out. Reconnecting...", err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectWithTimeoutHandling();
        } else {
            throw err;
        }
    });
}

/**
* @description Execute SQL statement in MySQL database
*/
function sqlCall(sql, callback) {
    connection.query(sql, function (err, result, fields) {  
        // if (err) console.error(err);
        callback(result);
    });
};

/**
* @description Close SQL connection
*/
function closeConnection() {
    connection.end();
}

connectWithTimeoutHandling();
 
module.exports = { sqlCall, closeConnection };