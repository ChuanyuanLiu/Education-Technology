var request = require('request');

// Options for token retrieval
var tokenOptions = { method: 'POST',
    url: 'https://edtechevaluation.au.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"UmFMaTcN3f4VyiHsj0DG4sLvU1o3RdEx","client_secret":"oWVLKgCtsZCasVR9OPeMwUSpcBnUuLtWXkCzSCGDaDLsNyg8MsmUsd-R-rJ-lIgz","audience":"https://edtechevaluation.au.auth0.com/api/v2/","grant_type":"client_credentials"}' };

// Request and store the Auth0 Management API token
var token = null;
request(tokenOptions, function (error, response, body) {
    if (error) throw new Error(error);
    token = JSON.parse(body);
});

/**
 * Make an API call to the Auth0 Management API
 * 
 * @param {*} callMethod 
 * @param {*} callUrl 
 * @param {*} callback 
 */
function auth0Call(callMethod, callUrl, postBody, callback) {
    var options = {
        method: callMethod,
        url: callUrl,
        headers: {
            authorization: `${token.token_type} ${token.access_token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(postBody),
    };
    // Return the response back to the callback
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
}

module.exports = { auth0Call };