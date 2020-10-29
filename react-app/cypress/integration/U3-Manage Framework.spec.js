/// <reference types="Cypress" />
import {INPUT_BUTTON,searchTitle, SWITCH_BUTTON, NEW_FRAMEWORK_NAME, TICK_BUTTON, editTitle, back} from "../support/constants";

// assumes already logged in as Senior consultant
describe("U3 Manage Framework", function () {

    beforeEach(function() {
        // visit page
        cy.home();
        // go to framework page
        cy.contains("Frameworks").click();
    });

    it("2.1 Create new framework", function () {
        // create a new framework
        cy.contains('button', 'New Framework').click();
        // edit question title
        editTitle(NEW_FRAMEWORK_NAME);
    });

    // assumes that NEW_FRAMEWORK_NAME was created and editable
    it("2.2 Add questions and sections", () => {
        searchTitle(NEW_FRAMEWORK_NAME).click()
        // add a section and edit it
        cy.contains("Add Section").click();
        cy.get('.editable_section').first().as("section").within(() => {
            cy.get(INPUT_BUTTON).click();
        });
        cy.get('@section').within(()=>{
            cy.get('input').type("{selectall}Section editable");
            cy.get(TICK_BUTTON).click();
        });
        // create a new question
        cy.contains("Add Question").click();
        // go to new question
        cy.contains('New Question').first().click();
        // edit title
        editTitle("Question editable");
        // edit all 5 criterions
        for (let i = 1; i <= 5; i++) {
            cy.get('.TextArea:nth-child('+i+')').within(()=>{
                cy.get(INPUT_BUTTON).click();
                cy.get('textarea').type('{selectall}').type(i);
                cy.get(TICK_BUTTON).click();
            });
        }
        // TODO check if data persists
    })

    // assumes new framework has been created 
    it("2.3.1 mark a framework as finalized", ()=>{
        // go to a framework
        searchTitle(NEW_FRAMEWORK_NAME).click()
        // click finalize
        cy.contains('button', "Finalise").click();
    });

    // assumes a framework is inactive
    it("2.3.2 mark a framework as inactive and active", ()=>{
        // go to a framework
        searchTitle(NEW_FRAMEWORK_NAME).click()
        // toggle button
        cy.get(SWITCH_BUTTON).click();
        cy.get(SWITCH_BUTTON).click();
        cy.get(SWITCH_BUTTON).click();
    });

    // assumes a framework is finalized
    it("2.4 create a copy of a finalized framework", ()=>{
        // go to a framework
        cy.contains('Active').first().click()
        // click finalize
        cy.contains('button', "Save As New").click();
    });

});
