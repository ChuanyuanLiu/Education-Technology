var express = require('express');
var router = express.Router();

var sqlConnector = require('./sqlConnector');

router.get('/', function(req, res, next) {
    sqlConnector.sqlCall("SELECT * FROM evaluation", function(sqlRes) {
        res.send(sqlRes);
    });
});
  
module.exports = router;