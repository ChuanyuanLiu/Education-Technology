/// <reference types="Cypress" />
import {INPUT_BUTTON, NEW_REPORT_NAME,SWITCH_BUTTON, NEW_USER_NAME, searchTitle, NEW_FRAMEWORK_NAME, TICK_BUTTON, editTitle, back, NEW_EVALUATION_NAME} from "../support/constants";

// assumes already logged in as Senior consultant
describe("U2 User Management", function () {

    beforeEach(function() {
        // visit page
        cy.home();
        // go to framework page
        cy.contains("User Management").click();
        cy.wait(4000);
    });

    it("2.1 access User Management Page", function(){
        searchTitle("Gerald");
    });

    it("2.2 Add new user", function() {
        cy.contains("button", "Add New User").click();
        cy.wait(4000);
        cy.get("[placeholder='Please input a name']").type(NEW_USER_NAME);
        cy.get("[placeholder='Please input an email']").type("a@a.com");
        cy.get("[placeholder='Please input a password']").type("123");
        // Assumes the deault is education leader
        // Note that antd dropdowns aren't selectable
        cy.contains("Educational Leader");
        // crate user
        cy.contains("button", "Create").click();
    });

    it("2.3 Edit user information and privileges", function() {
        searchTitle(NEW_USER_NAME).click();
        cy.wait(2000);
        // deactivate user
        cy.get(':nth-child(2) > .StatusSwitch-switch > .ant-switch').click();
        // edit permission
        cy.get(':nth-child(6) > .StatusSwitch-switch > .ant-switch').click();
        // edit password
        cy.contains(".TextArea", "Password").within(()=>{
            cy.get(INPUT_BUTTON).click();
            cy.get("input").type("new password");
            cy.get(TICK_BUTTON).click();
        });
        // reactivate user
        cy.get(':nth-child(2) > .StatusSwitch-switch > .ant-switch').click();
    });

    it("2.4 Delete a user", function(){
        searchTitle(NEW_USER_NAME).click();
        cy.wait(1000);
        // deactivate user
        cy.get(':nth-child(2) > .StatusSwitch-switch > .ant-switch').click();
        // delete user
        cy.contains("button", "Delete").click();
        cy.wait(1000);
        cy.contains("Yes").click();
    });

});