var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let testReport = {
        testField: 'testEntry'
    }
    res.send(testReport);
});
  
module.exports = router;