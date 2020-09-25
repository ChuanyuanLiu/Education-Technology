
// This file is for back-end framework test

var sqlConnector = require('../utils/sqlAdapter');

afterAll(() => {
    sqlConnector.closeConnection();
});

// Yao parts -- 1. Get /framework
describe("Get /framework", () => {

    const input = "SELECT * FROM framework";

    // 1. EC1: Returned data should be a defined object
    test("Should return a defined object", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields in the framework.
    // Namely 'framework_id', 'framework_title', 'framework_author', 'framework_creation_time', 'framework_active_status' and 'framework_published'
    test("Returned data should contain all valid fields in the framework.", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            expect('framework_id' in res[0]).toEqual(true);
            expect("framework_title" in res[0]).toEqual(true);
            expect("framework_author" in res[0]).toEqual(true);
            expect("framework_creation_time" in res[0]).toEqual(true);
            expect("framework_active_status" in res[0]).toEqual(true);
            expect("framework_published" in res[0]).toEqual(true);
            done();
        });
    });

    // 4. EC4: 'framework_id' should be integer
    test("'framework_id' should be integer", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].framework_id))).toEqual(true);
            done();
        });
    });

    // 5. EC5: 'framework_active_status' should be either 0 or 1
    test("'framework_active_status' should be either 0 or 1", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].framework_active_status == 0 || res[0].framework_active_status == 1 )
                isvalidvalue = true;
            expect(isvalidvalue).toEqual(true);
            done();
        });
    });

    //6. EC6: 'framework_published' should be either 0 or 1
    test("'framework_published' should be either 0 or 1", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].framework_published == 0 || res[0].framework_published == 1 )
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
        sqlConnector.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields.
    // Namely, 'section_id', 'section_title', 'framework_id', 'question_id', 'question_titile', 'rate_1_criterion', 'rate_2_criterion', 'rate_3_criterion', 'rate_4_criterion', 'rate_5_criterion'
    test("Returned data should contain 'section_id'", done => {
        sqlConnector.sqlCall(input, function(res) 
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
        sqlConnector.sqlCall(input, function(res) 
        {
            sqlConnector.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].section_id))).toEqual(true);
                done();
            });
        });
    });

    //5. EC5: 'framework_id' should be integer
    test("'framework_id' should be integer", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            sqlConnector.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].framework_id))).toEqual(true);
                done();
            });
        });
    });

    //6. EC6: 'question_id' should be integer
    test("'question_id' should be integer", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            sqlConnector.sqlCall(input, function(res) 
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
        sqlConnector.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });

    // 2. EC2: Returned data should be an array
    test("Should return an array", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });

    // 3. EC3: Returned data should contain all valid fields.
    // Namely, 'question_id', 'squestion_title', 'section_id', 'rate_1_criterion', 'rate_2_criterion', 'rate_3_criterion', 'rate_4_criterion', 'rate_5_criterion'
    test("Returned data should contain 'question_id'", done => {
        sqlConnector.sqlCall(input, function(res) 
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
        sqlConnector.sqlCall(input, function(res) 
        {
            sqlConnector.sqlCall(input, function(res) 
            {
                expect(!isNaN(Number(res[0].section_id))).toEqual(true);
                done();
            });
        });
    });

    //5. EC5: 'question_id' should be integer
    test("'question_id' should be integer", done => {
        sqlConnector.sqlCall(input, function(res) 
        {
            sqlConnector.sqlCall(input, function(res) 
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
    //     sqlConnector.sqlCall(resetTable, function(res) {
    //         done();
    //     })
    // });

    // 1. EC1: Should insert the new framework in the database
    test("Should insert the new framework in the database", done => {
        sqlConnector.sqlCall(getMaxFramework_id, function(maxframework_idRes) {
            let maxframework_id = maxframework_idRes[0].maxframework_id;

            sqlConnector.sqlCall(input, function(inputRes) {

                sqlConnector.sqlCall(inputCheck, function(checkRes) {
                    expect(checkRes[0].framework_id > maxframework_id).toEqual(true);
                    
                    // Delete the new added data
                    sqlConnector.sqlCall(resetTable, function(res) {
                        done();
                    });
                });
            });
        });
    });

    
    // 2. EC2: The title of new inserted framwork should be 'Old title - Copy'
    test("Should insert the new framework in the database", done => {
        sqlConnector.sqlCall(getOldFramework_title, function(inputRes) {
            let oldframework_title = inputRes[0].framework_title;
            sqlConnector.sqlCall(input, function(inputRes) {
                sqlConnector.sqlCall(inputCheck, function(checkRes) {
                    expect(checkRes[0].framework_title).toEqual(oldframework_title + " - Copy");
                    // Delete the new added data
                    sqlConnector.sqlCall(resetTable, function(res) {
                        done();
                    });            
                });
            });
        });
    });
});