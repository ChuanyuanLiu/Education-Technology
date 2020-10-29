/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to process all the back-end logic related to the authentication deployed by Auth0
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

 // Import the required modules
var express = require('express');
var request = require('request');
var router = express.Router();
var auth0Adapter = require('../dataSource/auth0Adapter');

/**
 * @description APIs for retrieving user data
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/', function (req, res, next) {
    /**
    * @api: GET localhost:3001/user?user_id={uid}
    * @description API for retrieving a single user
    * @param {number} req.query.user_id - user_id
    */
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            recurseRoles(0, [JSON.parse(auth0Res)], res);
        });

    /**
    * @api: GET localhost:3001/user
    * @description API for retrieving all users
    */
    } else {
        const url = "https://edtechevaluation.au.auth0.com/api/v2/users";
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            recurseRoles(0, JSON.parse(auth0Res), res);
        });
    }
});

/**
 * @description APIs for attaching roles to each user recursively
 * @param {any} index - index
 * @param {any} users - users
 * @param {any} res - res
 */
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
        console.log(users);
        res.send(users);
    }
}

/**
 * @description APIs for retrieving user's roles
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/roles', function (req, res, next) {
    /**
     * @api: GET https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles
     * @description APIs for retrieving a user's role
     * @param {number} req.query.user_id - user_id
     */
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}/roles`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            res.send(auth0Res);
        });

    /**
     * @api: GET https://139.99.155.172:3001/user/roles
     * @description APIs for retrieving all roles
     * @param {number} req.query.user_id - user_id
     */
    } else {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/roles`;
        auth0Adapter.auth0Call("GET", url, {}, function (auth0Res) {
            res.send(auth0Res);
        });
    }
});

/**
 * @api: GET https://139.99.155.172:3001/user/update?user_id={uid}
 * @description APIs for updating a user's details
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {any} req.query.user_id - user_id
 */
router.post('/update', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;
        auth0Adapter.auth0Call("PATCH", url, req.body, function (auth0Res) {
            console.log(auth0Res);
            res.send(auth0Res);
        });
    }
});

/**
 * @description APIs for updating a user's role
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {any} req.query.user_id - user_id
 */
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

/**
 * @description APIs for creating a new user with default role Consultant
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {any} req.query.user_id - user_id
 */
router.post('/new', function (req, res, next) {
    const url = "https://edtechevaluation.au.auth0.com/api/v2/users";

    // Extract role
    const role = req.body.role;
    let body = req.body;
    delete body["role"];

    // Create a new user
    auth0Adapter.auth0Call("POST", url, body, function (auth0UserRes) {
        console.log(auth0UserRes);
        let userRes = JSON.parse(auth0UserRes);

        const assignUrl = `https://edtechevaluation.au.auth0.com/api/v2/users/${userRes.user_id}/roles`;
        const assignBody = {"roles": [role.id]};

        // Assign role to new user
        auth0Adapter.auth0Call("POST", assignUrl, assignBody, function (auth0AssignRes) {
            console.log(auth0AssignRes);
            res.send(userRes);
        })
    })
});

/**
 * @description APIs for deleting a user
 * @api GET https://139.99.155.172:3001/user/delete?user_id={uid}
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {any} req.query.user_id - user_id
 */
router.get('/delete', function (req, res, next) {
    if (req.query.user_id != null) {
        const url = `https://edtechevaluation.au.auth0.com/api/v2/users/${req.query.user_id}`;

        auth0Adapter.auth0Call("DELETE", url, {}, function (auth0Res) {
            console.log(auth0Res);
            res.send(auth0Res);
        });
    }
});

module.exports = router;