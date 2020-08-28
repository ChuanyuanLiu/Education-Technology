var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let testFramework = {
        testField: 'testEntry'
    }
    res.send(testFramework);
});
  
module.exports = router;