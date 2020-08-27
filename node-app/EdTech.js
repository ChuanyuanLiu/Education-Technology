var express = require('express');  //Import express module
var mysql = require('mysql');      //Import mysql module
var app = express();               //Create an instance of express
 
/*
Create an instance of MySQL.
Now I am just using my local MySQL database, when we host it on server, we should modify the following configuration
*/
var connection = mysql.createConnection({      
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'mayuyao19970827',
    database:'test'
});
connection.connect();
var sql = 'SELECT * FROM test1';   //SQL statement
var str = "";
//Execute SQL statement in MySQL database
connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str = JSON.stringify(result);  //The data of the database query is stored in the 'result', but the browser cannot directly read 'result', so it needs to be parsed with JSON
    console.log(result);  //Used to show in the command line
 
});
app.get('/',function (req,res) {
    res.send(str); // Server responds to request
});
connection.end();
app.listen(3000,function () {    //Listen on port 3000
    console.log('Server running at 3000 port');
});