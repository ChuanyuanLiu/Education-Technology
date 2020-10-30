/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to implement tests for report.js
 * @confluence The test report of this test is documented in Back-end Integration Test Report
 * @tool Jest https://jestjs.io/
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

 // Import the required modules
var sqlAdapter = require('../dataSource/sqlAdapter');

// Defind afterAll() function to close SQL connection after test
afterAll(() => {
    sqlAdapter.closeConnection();
});

/**
 * @testedapi Get /report
 * @description 6 test cases in total
 */
describe("Get /report", () => {

    const input = "SELECT r.*, e.evaluation_title FROM report r, evaluation e WHERE r.evaluation_id = e.evaluation_id";

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

    // 3. EC3: Returned data should contain all valid fields we need.
    // Namely 'report_id', 'report_author', 'report_title', 'report_creation_time', 'report_modified_time', 
    // 'report_recommendation', 'report_finalised', 'evaluation_id', 'report_csv', and 'evaluation_title'
    test("Returned data should contain all valid fields we need", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect('report_id' in res[0]).toEqual(true);
            expect("report_author" in res[0]).toEqual(true);
            expect("report_title" in res[0]).toEqual(true);
            expect("report_creation_time" in res[0]).toEqual(true);
            expect("report_modified_time" in res[0]).toEqual(true);
            expect("report_recommendation" in res[0]).toEqual(true);
            expect("report_finalised" in res[0]).toEqual(true);
            expect("evaluation_id" in res[0]).toEqual(true);
            expect("report_csv" in res[0]).toEqual(true);
            expect("evaluation_title" in res[0]).toEqual(true);
            done();
        });
    });

    // 4. EC4: 'report_id' should be integer
    test("'report_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].report_id))).toEqual(true);
            done();
        });
    });

    // 5. EC5: 'report_finalised' should be either 0 or 1
    test("'report_finalised' should be either 0 or 1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].report_finalised == 0 || res[0].report_finalised == 1 )
                isvalidvalue = true;
            expect(isvalidvalue).toEqual(true);
            done();
        });
    });

    // 6. EC6: 'evaluation_id' should be integer
    test("'evaluation_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].evaluation_id))).toEqual(true);
            done();
        });
    });
});

/**
 * @testedapi Get /report?report_id={rid}
 * @description 6 test cases in total
 */
describe("Get /report?report_id={rid}", () => {

    let test_report_id = 1
    const input = "SELECT r.*, e.evaluation_title "
    + "FROM report r, evaluation e "
    + "WHERE r.report_id = " + test_report_id + " AND r.evaluation_id = e.evaluation_id";

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

    // 3. EC3: Returned data should contain all valid fields we need.
    // Namely 'report_id', 'report_author', 'report_title', 'report_creation_time', 'report_modified_time', 
    // 'report_recommendation', 'report_finalised', 'evaluation_id', 'report_csv', and 'evaluation_title'
    test("Returned data should contain all valid fields we need", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect('report_id' in res[0]).toEqual(true);
            expect("report_author" in res[0]).toEqual(true);
            expect("report_title" in res[0]).toEqual(true);
            expect("report_creation_time" in res[0]).toEqual(true);
            expect("report_modified_time" in res[0]).toEqual(true);
            expect("report_recommendation" in res[0]).toEqual(true);
            expect("report_finalised" in res[0]).toEqual(true);
            expect("evaluation_id" in res[0]).toEqual(true);
            expect("report_csv" in res[0]).toEqual(true);
            expect("evaluation_title" in res[0]).toEqual(true);
            done();
        });
    });

    // 4. EC4: 'report_id' should be integer
    test("'report_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].report_id))).toEqual(true);
            done();
        });
    });

    // 5. EC5: 'report_finalised' should be either 0 or 1
    test("'report_finalised' should be either 0 or 1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            let isvalidvalue = false;
            if (res[0].report_finalised == 0 || res[0].report_finalised == 1 )
                isvalidvalue = true;
            expect(isvalidvalue).toEqual(true);
            done();
        });
    });

    // 6. EC6: 'evaluation_id' should be integer
    test("'evaluation_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].evaluation_id))).toEqual(true);
            done();
        });
    });
});

/**
 * @testedapi POST /report/update/title?report_id={rid}
 * @description 3 test cases in total
 */
describe("POST /report/update/title?report_id={rid}", () => {

    const report_title = "Report based on St.Arthur Evaluataion";
    const report_id = 1;
    let prev_title = "";

    const input = `UPDATE report`
        + ` SET report_title = '${report_title}'`
        + ` WHERE report_id = ${report_id};`;
    
    const inputEmptyTitle = `UPDATE report`
        + ` SET report_title = ""`
        + ` WHERE report_id = ${report_id};`;
    
    const inputInvalidId = `UPDATE report`
        + ` SET report_title = '${report_title}'`
        + ` WHERE report_id = 0;`;

    const inputCheck = `SELECT report_title`
        + ` FROM report`
        + ` WHERE report_id = ${report_id};`;
    
    const inputCheckAll = `SELECT report_title`
        + ` FROM report;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].report_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE report`
            + ` SET report_title = '${prev_title}'`
            + ` WHERE report_id = ${report_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated report title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].report_title).toEqual(report_title);
            done();
        });
    });

    test("Should correctly store an empty report title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].report_title).toEqual("");
            done();
        });
    });

    test("Should not update any of the titles for an invalid report ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].report_title).not.toEqual(report_title);
            }
            done();
        }); 
    });

});

/**
 * @testedapi POST /report/update/recommendation?report_id={rid}
 * @description 3 test cases in total
 */
describe("POST /report/update/recommendation?report_id={rid}", () => {

    const report_recommendation = "The results of the evaluation are upto the mark. This evaluation is highly recommended";
    const report_id = 1;
    let prev_recommendation = "";

    const input = `UPDATE report`
        + ` SET report_recommendation = '${report_recommendation}'`
        + ` WHERE report_id = ${report_id};`;
    
    const inputEmptyRecommendation = `UPDATE report`
        + ` SET report_recommendation = ""`
        + ` WHERE report_id = ${report_id};`;
    
    const inputInvalidId = `UPDATE report`
        + ` SET report_recommendation = '${report_recommendation}'`
        + ` WHERE report_id = 0;`;

    const inputCheck = `SELECT report_recommendation`
        + ` FROM report`
        + ` WHERE report_id = ${report_id};`;
    
    const inputCheckAll = `SELECT report_recommendation`
        + ` FROM report;`;

    // Obtain the previous recommendation
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_recommendation = prevRes[0].report_recommendation;
            done();
        });
    });

    // Reset the recommendation to the previous recommendation after each test
    afterEach(done => {
        const resetTable = `UPDATE report`
            + ` SET report_recommendation = '${prev_recommendation}'`
            + ` WHERE report_id = ${report_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated report recommendation", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].report_recommendation).toEqual(report_recommendation);
            done();
        });
    });

    test("Should correctly store an empty report recommendation", done => {
        sqlAdapter.sqlCall(inputEmptyRecommendation + inputCheck, function(inputRes) {
            expect(inputRes[1][0].report_recommendation).toEqual("");
            done();
        });
    });

    test("Should not update any of the recommendation for an invalid report ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].report_recommendation).not.toEqual(report_recommendation);
            }
            done();
        }); 
    });

});

/**
 * @testedapi GET /report/new
 * @description 7 test cases in total
 */
describe("GET /report/new", () => {

    const input = "SELECT e.*, f.framework_title "
    + "FROM evaluation e, framework f "
    + "WHERE e.evaluation_finalised = 1 AND e.framework_id = f.framework_id";

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

    // 3. EC3: Returned data should contain all valid fields we need.
    // Namely 'evaluation_id', 'evaluation_author', 'evaluation_title', 'evaluation_creation_time', 'evaluation_modified_time', 
    // 'evaluation_summary', 'evaluation_completed', 'framework_id', 'evaluation_finalised', and 'framework_title'
    test("Returned data should contain all valid fields we need", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect('evaluation_id' in res[0]).toEqual(true);
            expect("evaluation_author" in res[0]).toEqual(true);
            expect("evaluation_title" in res[0]).toEqual(true);
            expect("evaluation_creation_time" in res[0]).toEqual(true);
            expect("evaluation_modified_time" in res[0]).toEqual(true);
            expect("evaluation_summary" in res[0]).toEqual(true);
            expect("evaluation_completed" in res[0]).toEqual(true);
            expect("framework_id" in res[0]).toEqual(true);
            expect("evaluation_finalised" in res[0]).toEqual(true);
            expect("framework_title" in res[0]).toEqual(true);
            done();
        });
    });

    // 4. EC4: 'evaluation_id' should be integer
    test("'evaluation_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].evaluation_id))).toEqual(true);
            done();
        });
    });

    // 5. EC5: 'evaluation_completed' should be 1
    test("'evaluation_completed' should be  1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(res[0].evaluation_completed).toEqual(1);
            done();
        });
    });

    // 6. EC6: 'framework_id' should be integer
    test("'framework_id' should be integer", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(!isNaN(Number(res[0].framework_id))).toEqual(true);
            done();
        });
    });

    // 7. EC7: 'evaluation_finalised' should be 1
    test("'evaluation_finalised' should be  1", done => {
        sqlAdapter.sqlCall(input, function(res) 
        {
            expect(res[0].evaluation_finalised).toEqual(1);
            done();
        });
    });
});

/**
 * @testedapi GET /report/new?evaluation_id={eid}&author_name={author_name}
 * @description 6 test cases in total
 */
describe("GET /report/new?evaluation_id={eid}&author_name={author_name}", () => {

    let evaluation_id = 1;
    let author_name = "Toby";

    const input = "INSERT INTO report ( evaluation_id, report_author ) VALUES ( " + evaluation_id + ", '" + author_name + "' );"
    + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
    + "SELECT r.*, e.evaluation_title FROM report r, evaluation e WHERE r.evaluation_id = e.evaluation_id AND report_id = (SELECT LAST_INSERT_ID());"

    // As this API will affect the database, all test cases will be executed by 1 sql call
    test("Combination tests", done => {
        sqlAdapter.sqlCall(input, function(res) {

            // 1. EC1: Returned data should be a defined object
            expect(res[2]).not.toBeUndefined();

            // 2. EC2: Returned data should be an array
            expect(res[2]).toEqual(
                expect.arrayContaining([])
            );

            // 3. EC3: Returned data should contain all valid fields we need.
            // Namely 'report_id', 'report_author', 'report_title', 'report_creation_time', 'report_modified_time', 
            // 'report_recommendation', 'report_finalised', 'evaluation_id', 'report_csv', and 'evaluation_title'
            expect('report_id' in res[2][0]).toEqual(true);
            expect("report_author" in res[2][0]).toEqual(true);
            expect("report_title" in res[2][0]).toEqual(true);
            expect("report_creation_time" in res[2][0]).toEqual(true);
            expect("report_modified_time" in res[2][0]).toEqual(true);
            expect("report_recommendation" in res[2][0]).toEqual(true);
            expect("report_finalised" in res[2][0]).toEqual(true);
            expect("evaluation_id" in res[2][0]).toEqual(true);
            expect("report_csv" in res[2][0]).toEqual(true);
            expect("evaluation_title" in res[2][0]).toEqual(true);
            
            // 4. EC4: 'report_id' should be integer
            expect(!isNaN(Number(res[2][0].report_id))).toEqual(true);
        
            // 5. EC5: 'report_finalised' should be 0 
            expect(res[2][0].report_finalised).toEqual(0);
            
            // 6. EC6: 'evaluation_id' should be integer
            expect(!isNaN(Number(res[2][0].evaluation_id))).toEqual(true);

            // Recover the database
            const recovery = "DELETE FROM report WHERE report_id = " + res[2][0].report_id;
            sqlAdapter.sqlCall(recovery, function(recoveryRes) {
            });

            done();
        });
    });
});


