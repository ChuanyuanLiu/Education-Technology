
/*********** Constants */
const BACK_BUTTON = "#backButton";
const NEW_FRAMEWORK_NAME = "Framework Title Editable";
const NEW_EVALUATION_NAME = "Evaluation Title Editable";
const NEW_USER_NAME = "User for Cypress testing";
const NEW_REPORT_NAME = "Rreport Title Editable";
const INPUT_BUTTON = ".section_input_button"; // the pen like button
const TICK_BUTTON = ".anticon-check"; // the tick beside input boxes
const SWITCH_BUTTON = ".StatusSwitch";
/********** Resusable methods */
function editTitle(title) {
    cy.get(".NavBar").within(() => {
        cy.get(INPUT_BUTTON).click();
        cy.get("input").type("{selectall}").type(title);
        cy.get(TICK_BUTTON).click();
    });
}

function back() {
    cy.get(BACK_BUTTON).click();
}

// Search a framework or evaluation and to the first result returned
function searchTitle(title) {
    // search
    cy.get(".ant-input").type(title);
    // go to framework
    return cy.contains(".InfoCard", title);
}

export{BACK_BUTTON, SWITCH_BUTTON, NEW_FRAMEWORK_NAME,NEW_USER_NAME, NEW_EVALUATION_NAME, NEW_REPORT_NAME, INPUT_BUTTON, TICK_BUTTON,
editTitle, searchTitle, back};