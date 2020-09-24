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