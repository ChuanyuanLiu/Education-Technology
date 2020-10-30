// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference type="Cypress">

Cypress.Commands.add('SeniorConsultantLogin', (overrides = {}) => {
    Cypress.log({
      name: 'loginViaAuth0',
    });
  
    const options = {
      method: 'POST',
      url: "https://edtechevaluation.au.auth0.com/",
      body: {
        grant_type: 'password',
        username: "gerald@edtechevaluation.com.au",
        password: "Gerald@Edtech",
        audience: "https://edtechevaluation.au.auth0.com/",
        scope: 'openid profile email',
        client_id: "f7XkkPm5SPP79RC22KdVMTvyHddTR3p6",
        client_secret: "RTEaE0RjeosZLfnhMVEDkK2gm1xBL1JQBAcMbJ4tlrHnBtyvXM0tPkAewhS0pdCl",
      },
    };
    cy.request(options);
  });

// Go to home page
Cypress.Commands.add('home', (overrides = {}) => {
    cy.visit(Cypress.env('WEB_ADDRESS'));
});