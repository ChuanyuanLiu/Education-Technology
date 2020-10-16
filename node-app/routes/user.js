var express = require('express');
var request = require('request');
var router = express.Router();
var auth0Adapter = require('../utils/auth0Adapter');

// Retrieve all users
// Endpoint: "localhost:3001/user/all"
router.get('/all', function (req, res, next) {
    const url = "https://edtechevaluation.au.auth0.com/api/v2/users";

    auth0Adapter.auth0Call("GET", url, function (auth0Res) {
        res.send(auth0Res);
    });
});

// Retrieve all users with their respective roles
// Endpoint: "localhost:3001/user/all/roles"
router.get('/all/roles', function (req, res, next) {
    const url = "https://edtechevaluation.au.auth0.com/api/v2/users";

    auth0Adapter.auth0Call("GET", url, function (auth0Res) {
        recurseRoles(0, JSON.parse(auth0Res), res);
    });
});

// Attach roles to each user recursively
function recurseRoles(index, users, res) {
    if (index < users.length) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${users[index].user_id}/roles`;

        auth0Adapter.auth0Call("GET", url, function (auth0Res) {
            users[index].role = JSON.parse(auth0Res)[0].name;
            recurseRoles(index + 1, users, res);
        });
    } else {
        res.send(users);
    }
}

// Retrieve a users roles
// Endpoint: "localhost:3001/user/roles?user_id={uid}"
router.get('/roles', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles`;

        auth0Adapter.auth0Call("GET", url, function (auth0Res) {
            res.send(auth0Res);
        });
    }
});

module.exports = router;