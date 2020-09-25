var sqlAdapter = require('../utils/sqlAdapter');

afterAll(() => {
    sqlAdapter.closeConnection();
});

describe("GET/framework/new", () => {

    let framework_title = "New Framework";
    let framework_id = 1;
    test("This test results into the default value of framework title of recently added framework", done => {
        const sqlFramework = "INSERT INTO framework VALUES ();"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT f.framework_title, f.framework_id FROM framework f WHERE f.framework_id = (SELECT LAST_INSERT_ID());"
        
        sqlAdapter.sqlCall(sqlFramework, function (sqlRes){
            
            framework_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].framework_id == framework_id) {
                    expect(sqlRes[2][i].framework_title).toEqual(framework_title);
                }
            }
            done();
        });
    });
    //Reset the table, delete recently added framework
    afterEach(done => {
        const resetTable = "DELETE from framework"
            + "WHERE framework_id = " + framework_id ;
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});

describe("GET/framework/section/new?framework_id=1", () => {

    let section_title = "New Section";
    let framework_id = 1;
    let section_id = 1;

    test("This test results in the default value of the new section recently added to new framework", done => {
        const sqlSection ="INSERT INTO framework_section (framework_id) VALUES (" + framework_id + ");"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT s.section_title, s.section_id FROM framework_section s WHERE s.section_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlSection, function (sqlRes){
            
            section_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].section_id == section_id) {
                    expect(sqlRes[2][i].section_title).toEqual(section_title);
                }
           }
           done();
           
        });
    });
    //reset the table, delete the recenly added section
    afterEach(done => {
        const resetTable = "DELETE from framework_section"
            +"WHERE section_id = " + section_id ;
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});

describe("GET /framework/section/question/new?section_id=1", () => {
    let question_title = "New Question";
    let section_id = 1;
    let question_id = 1;

    test("This test returns the default value of currently entered new question", done => {
        const sqlQuestion = "INSERT INTO framework_section_question (section_id) VALUES (" + section_id + ");"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT q.question_title, q.question_id FROM framework_section_question q WHERE q.question_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlQuestion, function (sqlRes){

            question_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].question_id == question_id) {
                 expect(sqlRes[2][i].question_title).toEqual(question_title);
                }
           }
            done();
        });
        
    });
    //reset the table, delete new added question 
    afterEach(done => {
        const resetTable = "DELETE from framework_section_question"
            +"WHERE question_id = " + question_id ;
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});