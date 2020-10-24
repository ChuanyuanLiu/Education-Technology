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


