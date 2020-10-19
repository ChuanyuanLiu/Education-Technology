var express = require('express');
var request = require('request');
var router = express.Router();
var auth0Adapter = require('../utils/auth0Adapter');

router.get('/', function (req, res, next) {

    // Retrieve a single user
    // Endpoint: "localhost:3001/user?user_id={uid}"
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            recurseRoles(0, [JSON.parse(auth0Res)], res);
        });

    // Retrieve all users
    // Endpoint: "localhost:3001/user"
    } else {
        const url = "https://edtechevaluation.au.auth0.com/api/v2/users";
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            recurseRoles(0, JSON.parse(auth0Res), res);
        });
    }
    
});

// Attach roles to each user recursively
function recurseRoles(index, users, res) {
    console.log(index + " " + users.length);
    if (index < users.length) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${users[index].user_id}/roles`;

        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            // console.log(auth0Res);
            users[index].role = JSON.parse(auth0Res)[0];
            recurseRoles(index + 1, users, res);
        });
    } else {
        res.send(users);
    }
}

router.get('/roles', function (req, res, next) {

    // Retrieve a user's roles
    // Endpoint: "localhost:3001/user/roles?user_id={uid}"
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            res.send(auth0Res);
        });

    // Retrieve all roles
    // Endpoint: "localhost:3001/user/roles"
    } else {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/roles`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            res.send(auth0Res);
        });
    }
});

// Update a user's details
// Endpoint: "localhost:3001/user/update?user_id={uid}"
router.post('/update', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;
        auth0Adapter.auth0Call("PATCH", url, req.body, function (auth0Res) {
            console.log(auth0Res);
            res.send(auth0Res);
        });
    }
});

// Update a user's role
// Endpoint: "localhost:3001/user/update/role?user_id={uid}"
router.post('/update/role', function (req, res, next) {
    console.log("update role");
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles`;
        const delBody = {"roles": [req.body.old_role_id]};
        const addBody = {"roles": [req.body.new_role_id]};
        // Delete old role
        auth0Adapter.auth0Call("DELETE", url, delBody, function (auth0DelRes) {
            console.log(auth0DelRes);
            // Add new role
            auth0Adapter.auth0Call("POST", url, addBody, function (auth0AddRes) {
                console.log(auth0AddRes);
                res.send(auth0AddRes);
            });
        });
    }
});

router.post('/delete', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;

        auth0Adapter.auth0Call("DELETE", url, req.body, function (auth0Res) {
            console.log(auth0Res);
            res.send(auth0Res);
        });
    }
});

module.exports = router;