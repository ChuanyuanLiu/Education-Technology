var mysql = require('mysql');      //Import mysql module

/*
Create an instance of MySQL.
*/
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'edtech',
    database: 'edtech',
    multipleStatements: true, //Enable mutiple SQL statements
    timezone: "10:00" //Set Time Zone as +10:00
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
});

//Execute SQL statement in MySQL database
function sqlCall(sql, callback) {
    connection.query(sql, function (err, result, fields) {  
        if (err); //console.error(err);
        callback(result);
    });
};

function closeConnection() {
    connection.end();
}

module.exports = { sqlCall, closeConnection };