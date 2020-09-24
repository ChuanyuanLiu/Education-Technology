var sqlAdapter = require('../utils/sqlAdapter');

afterAll(() => {
    sqlAdapter.closeConnection();
});

describe("GET/framework/new", () => {

    let framework_title = "New Framework";

    test("new framework", done => {
        const sqlFramework = "INSERT INTO framework VALUES ();"
        + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        + "SELECT f.framework_title FROM framework f WHERE f.framework_id = (SELECT LAST_INSERT_ID());"
        
        sqlAdapter.sqlCall(sqlFramework, function (sqlRes){
            
            let framework_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].framework_id == framework_id) {
                 expect(sqlRes).toEqual(framework_title);
                }
            }
            
            done();
          
        });
    });
});

describe("GET/framework/section/new?framework_id=1", () => {

    let section_title = "New Section";
    let framework_id = 1;

    test("new section", done => {
        const sqlSection ="INSERT INTO framework_section (framework_id) VALUES (" + framework_id + ");"
        + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        + "SELECT s.section_title FROM framework_section s WHERE s.section_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlSection, function (sqlRes){
            
           let section_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].section_id == section_id) {
                 expect(sqlRes).toEqual(section_title);
                }
           }
           
            done();
          
        });
    });
});

describe("GET /framework/section/question/new?section_id=1", () => {
    let question_title = "New Question";
    let section_id = 1;

    test("new question", done => {
        const sqlQuestion = "INSERT INTO framework_section_question (section_id) VALUES (" + section_id + ");"
        + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        + "SELECT q.question_title FROM framework_section_question q WHERE q.question_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlQuestion, function (sqlRes){

            let question_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].question_id == question_id) {
                 expect(sqlRes).toEqual(question_title);
                }
           }
           
            done();
        });
    });
});
 