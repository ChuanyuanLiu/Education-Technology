var mysql = require('mysql');      //Import mysql module

/*
Create an instance of MySQL.
*/
var connection = mysql.createConnection({      
    host: 'localhost',
    user: 'root',
    password: 'mayuyao19970827',
    database: 'edtech'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Execute SQL statement in MySQL database
function sqlCall(sql, callback) {
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};

// connection.end();

module.exports = {sqlCall};