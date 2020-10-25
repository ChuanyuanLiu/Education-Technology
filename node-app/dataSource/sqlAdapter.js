/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used as an util to help with interacting with MySQL
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

 //Import mysql module
var mysql = require('mysql');      

/**
* @description Create an instance of MySQL.
* @param {string} host - define the host of MySQL
* @param {string} user - define the username of MySQL
* @param {string} password - define the password of MySQL
* @param {string} database - define the database used in MySQL
* @param {boolean} multipleStatements - define whether allow multiple Statements excuted in 1 SQL call
* @param {string} timezone - define the timezone used in MySQL
*/
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'edtech',
    database: 'edtech',
    multipleStatements: true, //Enable mutiple SQL statements
    timezone: "10:00" //Set Time Zone as +10:00
});

/**
* @description Connect database.
*/
connection.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
});

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
 
module.exports = { sqlCall, closeConnection };