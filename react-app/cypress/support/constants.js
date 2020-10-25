
/*********** Constants */
const BACK_BUTTON = "#backButton";
const NEW_FRAMEWORK_NAME = "Framework Title editable";
const NEW_EVALUATION_NAME = "Evaluation Title editable";
const INPUT_BUTTON = ".section_input_button"; // the pen like button
const TICK_BUTTON = ".anticon-check"; // the tick beside input boxes

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

function goToTestFramework() {
    // search
    cy.get(".ant-input").type(NEW_FRAMEWORK_NAME);
    // go to framework
    cy.contains(".CardList", NEW_FRAMEWORK_NAME).first().click();
}

export{BACK_BUTTON, NEW_FRAMEWORK_NAME, NEW_EVALUATION_NAME, INPUT_BUTTON, TICK_BUTTON,
editTitle, goToTestFramework, back};