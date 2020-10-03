var sqlAdapter = require('../utils/sqlAdapter');

afterAll(() => {
    sqlAdapter.closeConnection();
});

describe("POST /framework/update?framework_id={fid}", () => {

    const framework_title = "Test Framework";
    const framework_id = 1;
    let prev_title = "";

    const input = `UPDATE framework`
        + ` SET framework_title = '${framework_title}'`
        + ` WHERE framework_id = ${framework_id};`;
    
    const inputEmptyTitle = `UPDATE framework`
        + ` SET framework_title = ""`
        + ` WHERE framework_id = ${framework_id};`;
    
    const inputInvalidId = `UPDATE framework`
        + ` SET framework_title = '${framework_title}'`
        + ` WHERE framework_id = 0;`;

    const inputCheck = `SELECT framework_title`
        + ` FROM framework`
        + ` WHERE framework_id = ${framework_id};`;
    
    const inputCheckAll = `SELECT framework_title`
        + ` FROM framework;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].framework_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework`
            + ` SET framework_title = '${prev_title}'`
            + ` WHERE framework_id = ${framework_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated framework title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_title).toEqual(framework_title);
            done();
        });
    });

    test("Should correctly store an empty framework title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_title).toEqual("");
            done();
        });
    });

    test("Should not update any of the titles for an invalid framework ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].framework_title).not.toEqual(framework_title);
            }
            done();
        }); 
    });

});

describe("POST /framework/section/update?section_id={sid}", () => {

    const section_title = "Test Section";
    const section_id = 1;
    let prev_title = "";

    const input = `UPDATE framework_section`
        + ` SET section_title = '${section_title}'`
        + ` WHERE section_id = ${section_id};`;
    
    const inputEmptyTitle = `UPDATE framework_section`
        + ` SET section_title = ""`
        + ` WHERE section_id = ${section_id};`;
    
    const inputInvalidId = `UPDATE framework_section`
        + ` SET section_title = '${section_title}'`
        + ` WHERE section_id = 0;`;

    const inputCheck = `SELECT section_title`
        + ` FROM framework_section`
        + ` WHERE section_id = ${section_id};`;
    
    const inputCheckAll = `SELECT section_title`
        + ` FROM framework_section;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].section_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework_section`
            + ` SET section_title = '${prev_title}'`
            + ` WHERE section_id = ${section_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated section title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].section_title).toEqual(section_title);
            done();
        });
    });

    test("Should correctly store an empty section title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].section_title).toEqual("");
            done();
        });
    });

    test("Should not update any of the titles for an invalid section ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].section_title).not.toEqual(section_title);
            }
            done();
        }); 
    });

});

describe("POST /framework/section/question/update?question_id={qid}", () => {

    const question_title = "Test Question";
    const question_id = 1;
    let prev_title = "";

    const input = `UPDATE framework_section_question`
        + ` SET question_title = '${question_title}'`
        + ` WHERE question_id = ${question_id};`;
    
    const inputEmptyTitle = `UPDATE framework_section_question`
        + ` SET question_title = ""`
        + ` WHERE question_id = ${question_id};`;
    
    const inputInvalidId = `UPDATE framework_section_question`
        + ` SET question_title = '${question_title}'`
        + ` WHERE question_id = 0;`;

    const inputCheck = `SELECT question_title `
        + `FROM framework_section_question `
        + `WHERE question_id = ${question_id};`;
    
    const inputCheckAll = `SELECT question_title `
        + `FROM framework_section_question;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].question_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework_section_question`
            + ` SET question_title = '${prev_title}'`
            + ` WHERE question_id = ${question_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated question title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].question_title).toEqual(question_title);
            done();
        });
    });

    test("Should correctly store an empty question title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].question_title).toEqual("");
            done();
        });
    });
    test("Should not update any of the titles for an invalid question ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].question_title).not.toEqual(question_title);
            }
            done();
        }); 
    });

});

describe("POST /framework/section/question/rate/update?question_id={qid}", () => {

    const rate_1_criterion = "Test Rate 1";
    const rate_2_criterion = "Test Rate 2";
    const rate_3_criterion = "Test Rate 3";
    const rate_4_criterion = "Test Rate 4";
    const rate_5_criterion = "Test Rate 5";
    const question_id = 1;
    let prev_criteria = [];

    const input = `UPDATE framework_section_question`
        + ` SET rate_1_criterion = '${rate_1_criterion}',`
            + ` rate_2_criterion = '${rate_2_criterion}',`
            + ` rate_3_criterion = '${rate_3_criterion}',`
            + ` rate_4_criterion = '${rate_4_criterion}',`
            + ` rate_5_criterion = '${rate_5_criterion}'`
        + ` WHERE question_id = ${question_id};`;
    
    const inputEmptyCriteria = `UPDATE framework_section_question`
        + ` SET rate_1_criterion = "",`
            + ` rate_2_criterion = "",`
            + ` rate_3_criterion = "",`
            + ` rate_4_criterion = "",`
            + ` rate_5_criterion = ""`
    + ` WHERE question_id = ${question_id};`;
    
    const inputInvalidId = `UPDATE framework_section_question`
    + ` SET rate_1_criterion = '${rate_1_criterion}',`
        + ` rate_2_criterion = '${rate_2_criterion}',`
        + ` rate_3_criterion = '${rate_3_criterion}',`
        + ` rate_4_criterion = '${rate_4_criterion}',`
        + ` rate_5_criterion = '${rate_5_criterion}'`
    + ` WHERE question_id = 0;`;

    const inputCheck = `SELECT *`
        + ` FROM framework_section_question`
        + ` WHERE question_id = ${question_id};`;
    
    const inputCheckAll = `SELECT *`
        + ` FROM framework_section_question;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_criteria.push(prevRes[0].rate_1_criterion);
            prev_criteria.push(prevRes[0].rate_2_criterion);
            prev_criteria.push(prevRes[0].rate_3_criterion);
            prev_criteria.push(prevRes[0].rate_4_criterion);
            prev_criteria.push(prevRes[0].rate_5_criterion);
            done();
        });
    });
    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework_section_question`
            + ` SET rate_1_criterion = '${prev_criteria[0]}',`
                + ` rate_2_criterion = '${prev_criteria[1]}',`
                + ` rate_3_criterion = '${prev_criteria[2]}',`
                + ` rate_4_criterion = '${prev_criteria[3]}',`
                + ` rate_5_criterion = '${prev_criteria[4]}'`
            + ` WHERE question_id = ${question_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            prev_criteria = [];
            done();
        });
    });

    test("Should correctly store the updated criteria", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].rate_1_criterion).toEqual(rate_1_criterion);
            expect(inputRes[1][0].rate_2_criterion).toEqual(rate_2_criterion);
            expect(inputRes[1][0].rate_3_criterion).toEqual(rate_3_criterion);
            expect(inputRes[1][0].rate_4_criterion).toEqual(rate_4_criterion);
            expect(inputRes[1][0].rate_5_criterion).toEqual(rate_5_criterion);
            done();
        });
    });

    test("Should correctly store empty criteria", done => {
        sqlAdapter.sqlCall(inputEmptyCriteria + inputCheck, function(inputRes) {
            expect(inputRes[1][0].rate_1_criterion).toEqual("");
            expect(inputRes[1][0].rate_2_criterion).toEqual("");
            expect(inputRes[1][0].rate_3_criterion).toEqual("");
            expect(inputRes[1][0].rate_4_criterion).toEqual("");
            expect(inputRes[1][0].rate_5_criterion).toEqual("");
            done();
        });
    });

    test("Should not update any of the criteria for an invalid question ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].rate_1_criterion).not.toEqual(rate_1_criterion);
                expect(inputRes[1][i].rate_2_criterion).not.toEqual(rate_2_criterion);
                expect(inputRes[1][i].rate_3_criterion).not.toEqual(rate_3_criterion);
                expect(inputRes[1][i].rate_4_criterion).not.toEqual(rate_4_criterion);
                expect(inputRes[1][i].rate_5_criterion).not.toEqual(rate_5_criterion);
            }
            done();
        }); 
    });

});

describe("POST /framework/activestatus/update?framework_id={fid}", () => {

    const framework_id = 1;
    let prev_status = 0;

    const inputOn = `UPDATE framework`
        + ` SET framework_active_status = 1`
        + ` WHERE framework_id = ${framework_id};`;

    const inputOff = `UPDATE framework`
        + ` SET framework_active_status = 0`
        + ` WHERE framework_id = ${framework_id};`;

    const inputCheck = `SELECT framework_active_status`
        + ` FROM framework`
        + ` WHERE framework_id = ${framework_id};`;

    // Obtain the previous status
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_status = prevRes[0].framework_active_status;
            done();
        });
    });

    // Reset the status to the previous status after each test
    afterEach(done => {
        const resetTable = `UPDATE framework`
            + ` SET framework_active_status = '${prev_status}'`
            + ` WHERE framework_id = ${framework_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly toggle on the framework active status", done => {
        sqlAdapter.sqlCall(inputOn + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_active_status).toEqual(1);
            done();
        });
    });

    test("Should correctly toggle off the framework active status", done => {
        sqlAdapter.sqlCall(inputOff + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_active_status).toEqual(0);
            done();
        });
    });

    test("Should not update the status for an invalid framework ID", done => {
        const inputInvalidId = `UPDATE framework`
            + ` SET framework_active_status = '${1 - prev_status}'`
            + ` WHERE framework_id = 0;`;
        sqlAdapter.sqlCall(inputInvalidId + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_title).not.toEqual(1 - prev_status);
            done();
        }); 
    });

});

describe("POST /framework/finalisedstatus/update?framework_id={fid}", () => {

    const initFramework = "INSERT INTO framework () VALUES ();";

    const resetTable = "DELETE FROM framework WHERE framework_id = (SELECT LAST_INSERT_ID());";

    const inputOn = `UPDATE framework`
        + ` SET framework_finalised = 1`
        + ` WHERE framework_id = (SELECT LAST_INSERT_ID())`
        + ` AND framework_finalised = 0;`;
    
    const inputOff = `UPDATE framework`
        + ` SET framework_finalised = 0`
        + ` WHERE framework_id = (SELECT LAST_INSERT_ID())`
        + ` AND framework_finalised = 0;`;

    const inputCheck = `SELECT framework_finalised`
        + ` FROM framework`
        + ` WHERE framework_id = (SELECT LAST_INSERT_ID());`;

    // Obtain the previous status
    beforeEach(done => {
        sqlAdapter.sqlCall(initFramework, function(prevRes) {
            done();
        });
    });

    // Reset the status to the previous status after each test
    afterEach(done => {
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly toggle on the framework finalised status", done => {
        sqlAdapter.sqlCall(inputOn + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_finalised).toEqual(1);
            done();
        });
    });

    test("Should prevent toggling off the framework finalised status", done => {
        sqlAdapter.sqlCall(inputOn + inputOff + inputCheck, function(inputRes) {
            expect(inputRes[2][0].framework_finalised).toEqual(1);
            done();
        });
    });

});

// Yao parts -- 1. Get /framework
describe("Get /framework", () => {

    const input = "SELECT * FROM framework";

    // 1. EC1: Returned data should be a defined object
    test("Should return a defined object", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields in the framework.
    // Namely 'framework_id', 'framework_title', 'framework_author', 'framework_creation_time', 'framework_active_status' and 'framework_finalised'
    test("Returned data should contain all valid fields in the framework.", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect('framework_id' in res[0]).toEqual(true);
            expect("framework_title" in res[0]).toEqual(true);
            expect("framework_author" in res[0]).toEqual(true);
            expect("framework_creation_time" in res[0]).toEqual(true);
            expect("framework_active_status" in res[0]).toEqual(true);
            expect("framework_finalised" in res[0]).toEqual(true);
            done();
        });
    });

    // 4. EC4: 'framework_id' should be integer
    test("'framework_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].framework_id))).toEqual(true);
            done();
        });
    });

    // 5. EC5: 'framework_active_status' should be either 0 or 1
    test("'framework_active_status' should be either 0 or 1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].framework_active_status == 0 || res[0].framework_active_status == 1 )
                isvalidvalue = true;
            expect(isvalidvalue).toEqual(true);
            done();
        });
    });

    //6. EC6: 'framework_finalised' should be either 0 or 1
    test("'framework_finalised' should be either 0 or 1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].framework_finalised == 0 || res[0].framework_finalised == 1 )
                isvalidvalue = true;
            expect(isvalidvalue).toEqual(true);
            done();
        });
    });
});

// Yao parts -- 2. GET /framework?framework_id={fid}
describe("GET /framework?framework_id={fid}", () => {
  
    // Assme that the fid = 1
    const fid = 1;

    const input = "SELECT * "
        + "FROM framework_section JOIN framework_section_question "
        + "ON framework_section.section_id = framework_section_question.section_id "
        + "WHERE framework_section.framework_id = " + fid;

    // 1. EC1: Returned data should be a defined object
    test("Should return a defined object", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields.
    // Namely, 'section_id', 'section_title', 'framework_id', 'question_id', 'question_titile', 'rate_1_criterion', 'rate_2_criterion', 'rate_3_criterion', 'rate_4_criterion', 'rate_5_criterion'
    test("Returned data should contain 'section_id'", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect("section_id" in res[0]).toEqual(true);
            expect("section_title" in res[0]).toEqual(true);
            expect("framework_id" in res[0]).toEqual(true);
            expect("question_id" in res[0]).toEqual(true);
            expect("question_title" in res[0]).toEqual(true);
            expect("rate_1_criterion" in res[0] && "rate_2_criterion" in res[0] && "rate_3_criterion" in res[0] && "rate_4_criterion" in res[0] && "rate_5_criterion" in res[0]).toEqual(true);
            done();
        });
    });

    //4. EC4: 'section_id' should be integer
    test("'section_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            sqlAdapter.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].section_id))).toEqual(true);
                done();
            });
        });
    });

    //5. EC5: 'framework_id' should be integer
    test("'framework_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            sqlAdapter.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].framework_id))).toEqual(true);
                done();
            });
        });
    });

    //6. EC6: 'question_id' should be integer
    test("'question_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            sqlAdapter.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].question_id))).toEqual(true);
                done();
            });
        });
    });
});

// Yao parts -- 3. GET /framework?question_id={qid}
describe("GET /framework?question_id={qid}", () => {
  
    // Assme that the qid = 1
    const qid = 1;

    const input = "SELECT * "
    + "FROM framework_section_question "
    + "WHERE question_id = " + qid;

    // 1. EC1: Returned data should be a defined object
    test("Should return a defined object", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields.
    // Namely, 'question_id', 'squestion_title', 'section_id', 'rate_1_criterion', 'rate_2_criterion', 'rate_3_criterion', 'rate_4_criterion', 'rate_5_criterion'
    test("Returned data should contain 'question_id'", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect("question_id" in res[0]).toEqual(true);
            expect("question_title" in res[0]).toEqual(true);
            expect("section_id" in res[0]).toEqual(true);
            expect("rate_1_criterion" in res[0] && "rate_2_criterion" in res[0] && "rate_3_criterion" in res[0] && "rate_4_criterion" in res[0] && "rate_5_criterion" in res[0]).toEqual(true);
            done();
        });
    });

    //4. EC4: 'section_id' should be integer
    test("'section_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            sqlAdapter.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].section_id))).toEqual(true);
                done();
            });
        });
    });

    //5. EC5: 'question_id' should be integer
    test("'question_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            sqlAdapter.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].question_id))).toEqual(true);
                done();
            });
        });
    });
});

// Yao parts -- 4. GET /framework/version?framework_id={fid}
describe("4. GET /framework/version?framework_id={fid}", () => {
  
    // Assme that the fid = 1
    const fid = 1;

    const input = "INSERT INTO framework(framework_title,framework_author) "
    + "SELECT CONCAT(framework_title,' - Copy'),framework_author "
    + "FROM framework where framework_id = " + fid;

    const getMaxFramework_id = "SELECT MAX(framework_id) AS maxframework_id FROM framework";

    const getOldFramework_title = "SELECT framework_title FROM framework WHERE framework_id = " + fid;
        
    const inputCheck = "SELECT * FROM framework WHERE framework_id = (select max(framework_id) AS maxframework_id from framework)";
    
    const resetTable = "DELETE a FROM framework a, (SELECT max(framework_id) AS max_id FROM framework)b WHERE a.framework_id = b.max_id";

    // afterEach(done => {
    //     sqlAdapter.sqlCall(resetTable, function(res) {
    //         done();
    //     })
    // });

    // 1. EC1: Should insert the new framework in the database
    test("Should insert the new framework in the database", done => {
        sqlAdapter.sqlCall(getMaxFramework_id, function(maxframework_idRes) {
            let maxframework_id = maxframework_idRes[0].maxframework_id;

            sqlAdapter.sqlCall(input, function(inputRes) {

                sqlAdapter.sqlCall(inputCheck, function(checkRes) {
                    expect(checkRes[0].framework_id > maxframework_id).toEqual(true);
                    
                    // Delete the new added data
                    sqlAdapter.sqlCall(resetTable, function(res) {
                        done();
                    });
                });
            });
        });
    });

    
    // 2. EC2: The title of newly inserted framework should be 'Old title - Copy'
    test("Should insert the new framework in the database", done => {
        sqlAdapter.sqlCall(getOldFramework_title, function(inputRes) {
            let oldframework_title = inputRes[0].framework_title;
            sqlAdapter.sqlCall(input, function(inputRes) {
                sqlAdapter.sqlCall(inputCheck, function(checkRes) {
                    expect(checkRes[0].framework_title).toEqual(oldframework_title + " - Copy");
                    // Delete the new added data
                    sqlAdapter.sqlCall(resetTable, function(res) {
                        done();
                    });            
                });
            });
        });
    });

});

describe("GET/framework/new", () => {

    let framework_title = "New Framework";
    let framework_id = 0;

    test("new framework", done => {
        const sqlFramework = "INSERT INTO framework VALUES ();"
        + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        + "SELECT f.framework_title FROM framework f WHERE f.framework_id = (SELECT LAST_INSERT_ID());"
        
        sqlAdapter.sqlCall(sqlFramework, function (sqlRes){
            
            framework_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].framework_id == framework_id) {
                    expect(sqlRes[2][i]).toEqual(framework_title);
                }
            }
            
            done();
          
        });
    });

    afterEach(done => {
        const resetTable = `DELETE FROM framework`
            + ` WHERE framework_id = ${framework_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});

describe("GET/framework/section/new?framework_id=1", () => {

    let section_title = "New Section";
    let framework_id = 1;
    let section_id = 0;

    test("new section", done => {
        const sqlSection ="INSERT INTO framework_section (framework_id) VALUES (" + framework_id + ");"
        + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        + "SELECT s.section_title FROM framework_section s WHERE s.section_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlSection, function (sqlRes){
            
            section_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].section_id == section_id) {
                    expect(sqlRes[2][i]).toEqual(section_title);
                }
            }
           
            done();
          
        });
    });

    afterEach(done => {
        const resetTable = `DELETE FROM framework_section`
            + ` WHERE section_id = ${section_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});

describe("GET /framework/section/question/new?section_id=1", () => {
    let question_title = "New Question";
    let section_id = 1;
    let question_id = 0;

    test("new question", done => {
        const sqlQuestion = "INSERT INTO framework_section_question (section_id) VALUES (" + section_id + ");"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT q.question_title FROM framework_section_question q WHERE q.question_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlQuestion, function (sqlRes){

            question_id = sqlRes[1][0].LAST_INSERT_ID;
            for (let i = 0; i < sqlRes[2].length; i++) {
                if (sqlRes[2][i].question_id == question_id) {
                    expect(sqlRes[2][i]).toEqual(question_title);
                }
            }
           
            done();
        });
    });

    afterEach(done => {
        const resetTable = `DELETE FROM framework_section_question`
            + ` WHERE question_id = ${question_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });
});