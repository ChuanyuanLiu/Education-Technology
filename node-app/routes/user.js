var express = require('express');
var request = require('request');
var router = express.Router();

var auth0Adapter = require('../utils/auth0Adapter');

// Retrieve a users roles
// Endpoint: "localhost:3001/user/roles?user_id={uid}"
router.get('/roles', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles`;

        auth0Adapter.auth0Call("GET", url, function (auth0res) {
            res.send(auth0res);
        });
    }
});

module.exports = router;