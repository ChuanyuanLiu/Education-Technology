var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let testEvaluation = {
        testField: 'testEntry'
    }
    res.send(testEvaluation);
});
  
module.exports = router;