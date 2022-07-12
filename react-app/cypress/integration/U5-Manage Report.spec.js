/// <reference types="Cypress" />
import {INPUT_BUTTON, NEW_REPORT_NAME, searchTitle, NEW_FRAMEWORK_NAME, TICK_BUTTON, editTitle, back, NEW_EVALUATION_NAME} from "../support/constants";

// assumes already logged in as Senior consultant
describe("U5 Manage Report", function () {

    beforeEach(function() {
        // visit page
        cy.home();
        // go to framework page
        cy.contains("Report").click();
    });

    it("5.1 acesss report", function (){
        // already done by beforeEach
    });

    it("5.2 generate report", function() {
        cy.contains("button", "New Report").click();
        searchTitle(NEW_EVALUATION_NAME).click();
        editTitle(NEW_REPORT_NAME);
    });

    it("5.3 modify unfinalised report", function() {
        cy.contains(".InfoCard", "Not Finalised").click();
        // add recommendation
        cy.get(".TextArea "+INPUT_BUTTON).click();
        cy.get("textarea").type("{selectall}Recommendation editable");
        cy.get(TICK_BUTTON).click();
    });

    it("5.4 finalised report", function() {
        cy.contains(".InfoCard", "Not Finalised").click();
        cy.contains("button", "Finalise").click();
    });

    it("5.5.1 download report", function() {
        cy.contains(".InfoCard", "Finalised").click();
        cy.contains("button", "Download").click();
    });

    it("5.5.2 send report", function() {
        cy.contains(".InfoCard", "Finalised").click();
        cy.contains("button", "Publish").click();
        // add receiver
        cy.contains("Add Receiver").click();
        cy.get("[placeholder='Type Email to send']").type(Cypress.env("EMAIL_ADDRESS"));
        // send email
        cy.contains("button", "Send").click();
    });
});