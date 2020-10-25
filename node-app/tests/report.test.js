var sqlAdapter = require('../utils/sqlAdapter');

afterAll(() => {
    sqlAdapter.closeConnection();
});

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

// Get /report
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

// Get /report?report_id={rid}
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


