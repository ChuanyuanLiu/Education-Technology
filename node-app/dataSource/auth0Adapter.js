/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used as an util to help with interacting with Auth0
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

 // Import the required modules
var request = require('request');

/**
* @description Options for token retrieval
* @param {string} method - define the method used for Auth0
* @param {string} url - define the url used for Auth0
* @param {boolean} headers - define the header used for Auth0
* @param {string} body - define the post body used for Auth0
*/
var tokenOptions = { method: 'POST',
    url: 'https://edtechevaluation.au.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"UmFMaTcN3f4VyiHsj0DG4sLvU1o3RdEx","client_secret":"oWVLKgCtsZCasVR9OPeMwUSpcBnUuLtWXkCzSCGDaDLsNyg8MsmUsd-R-rJ-lIgz","audience":"https://edtechevaluation.au.auth0.com/api/v2/","grant_type":"client_credentials"}' };

/**
* @description Request and store the Auth0 Management API token
*/
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