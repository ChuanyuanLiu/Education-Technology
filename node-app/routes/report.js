var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');

router.get('/', function (req, res, next) {
    sqlAdapter.sqlCall("SELECT * FROM report", function (sqlRes) {
        res.send(sqlRes);
    });
});

module.exports = router;