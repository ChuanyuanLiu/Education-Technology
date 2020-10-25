/// <reference types="Cypress" />
import {INPUT_BUTTON, NEW_EVALUATION_NAME, BACK_BUTTON, TICK_BUTTON, editTitle, back, searchTitle, NEW_FRAMEWORK_NAME} from "../support/constants";

describe("U3 Use Evaluation Framework", ()=>{

    beforeEach(function() {
        cy.home();
        // go to evaluation page
        cy.contains("Evaluations").click();
    });

    it("3.1-3.2 rate question", ()=> {
        // go to incompleted question
        cy.contains("Not Completed").first().click();
        // go to a question
        cy.contains("Section 1").first().click();
        cy.contains(".1").as('question').click();
        // rate
        cy.contains("Basic").click()
        // comment
        cy.get(".TextArea "+INPUT_BUTTON).click();
        cy.get("textarea").type("{selectall}comment editable");
        cy.get(TICK_BUTTON).click();
    });

    it("3.3 Create new evaluation", ()=> {
        // go to framework selection page
        cy.contains('button','New Evaluation').click();
        // select a framework
        cy.contains('Active').first().click();
        // we are now in the evaluation page
        editTitle(NEW_EVALUATION_NAME);
    });

    it("3.4 Add summary", ()=>{
        // got to incomplet evaluation
        cy.contains('Not Completed').first().click();
        // fill Summary
        cy.get(".TextArea "+INPUT_BUTTON).click();
        cy.get("textarea").type("{selectall}Summary editable");
        cy.get(TICK_BUTTON).click();        
    });

    // assumes we have new framework completed
    it("3.5 Complete all questions", ()=>{
        // create a new evaluation using the small framework so we can fill it fast
        cy.contains('button', 'New Evaluation').click();
        searchTitle(NEW_FRAMEWORK_NAME).click();
        editTitle("Short Evaluation");
        // // go back
        back();
        // find an evaluation
        searchTitle('Short Evaluation').as('evaluation').click();
        // go to a question
        cy.get(".sub_header").as('section').click();
        cy.contains("Question").as('question').click();
        // rate
        cy.contains("Basic").click()
        // comment
        cy.get(".TextArea "+INPUT_BUTTON).click();
        cy.get("textarea").type("{selectall}comment editable");
        cy.get(TICK_BUTTON).click(); 
        // go back to evaluation overview page
        back();
        // fill Summary
        cy.get(".TextArea").within(()=>{
            cy.get(INPUT_BUTTON).click();
            cy.get("textarea").type("{selectall}Summary editable");
            cy.get(TICK_BUTTON).click();   
        });
        // check we have two completed
        cy.get('@section').contains('Completed');
        cy.get('@question').contains('Completed');
        // go back to evaluation page
        back();
        // check if evaluation is completed
        cy.contains('.InfoCard', 'Short Evaluation').contains('Completed');
    });

    it("3.6 preivew framework", ()=>{
        // go to framework
        back();
        cy.contains("Frameworks").click();
        // check out the first 
        cy.get(".InfoCard").first();
    });

    // Assumes an evaluation was completed
    it("3.8 finalize evaluation", ()=>{
        cy.contains(/^Completed/).click();
        cy.contains('button', 'Finalise').click();
    });
})