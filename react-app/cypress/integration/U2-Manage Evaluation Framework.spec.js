/// <reference types="Cypress" />

// assumes already logged in as Senior consultant
describe("U2 Manage Evaluation Framework", function () {

    function editTitle(title) {
        cy.get(".NavBar").within(()=> {
            cy.get(INPUT_BUTTON).click();
            cy.get("input").type("{selectall}").type(title);
            cy.get(TICK_BUTTON).click();
        });
    }

    function back() {
        cy.get(BACK_BUTTON).click();
    }

    beforeEach(function() {
        // visit page
        cy.viewport(960, 978);
        cy.visit("http://localhost:3000/home_page");
        // go to framework page
        cy.contains("Frameworks").click();
    });

    xit("2.1 Create new framework", function () {
        // create a new framework
        cy.contains('button', 'New Framework').click();
        // edit question title
        back();
    });

    // assumes that NEW_FRAMEWORK_NAME was created and editable
    xit("2.2 Add questions and sections", () => {
        // search
        cy.get('.ant-input').type(NEW_FRAMEWORK_NAME);
        // go to framework
        cy.contains(".CardList", NEW_FRAMEWORK_NAME).first().click();
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

    // assumes a framework is not fianlized
    it("2.3.1 mark a framework as finalized", ()=>{
        // go to a framework
        cy.contains("Not Finalized").first().click();
        // click finalize
        cy.contains('button', "Finalise").click();
    });

    // assumes a framework is inactive
    it("2.3.2 mark a framework as active", ()=>{
        // go to a framework
        cy.contains("Inactive").first().click();
        // toggle button
        cy.get('.ant-switch').click();
    });

    // assumes a framework is active
    it("2.3.2 mark a framework as inactive", ()=>{
        // go to a framework
        cy.contains("Active").first().click();
        // toggle button
        cy.get('.ant-switch').click();
    });

     // assumes a framework is finalized
     it("2.4 create a copy of a finalized framework", ()=>{
        // go to a framework
        cy.contains("Inactive").first().click();
        // click finalize
        cy.contains('button', "Save As New").click();
    });
});
