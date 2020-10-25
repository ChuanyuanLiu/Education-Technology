/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to implement tests for evaluation.js
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
 * @testedapi test for GET /evaluation/new API
 * @description 4 test cases in total
 */
describe("GET /evaluation/new", () => {

    const input = "SELECT * FROM framework WHERE framework_active_status = 1";

    test("Should return a defined object", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });
    
    test("Should return an array", done => {
        sqlAdapter.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });
    
    test("Should return only active frameworks", done => {
        sqlAdapter.sqlCall(input, function(res) {
            if (res.length >= 0) {
                for(let i = 0; i < res.length; i++) {
                    expect(res[i].framework_active_status).toEqual(1);
                }
            }
            done();
        });
    });

    test("Should not return duplicate frameworks", done => {
        sqlAdapter.sqlCall(input, function(res){
            if (res.length >= 0) {
                let elems = [];
                for(let i = 0; i < res.length; i++) {
                    elems.push(res[i].framework_id);
                }
                expect(elems.length).toEqual([...new Set(elems)].length);
            }
            done();
        });
    });
});

/**
 * @testedapi GET /evaluation/new?framework_id={id}
 * @description 1 test case in total
 */
describe("GET /evaluation/new?framework_id={id}", () => {

    let framework_id = 1;
    let evaluation_id = 0;

    test("evaluation_id must be unique", done => {
        const sql = "INSERT INTO evaluation ( framework_id ) VALUES ( " + framework_id + " );"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT * FROM evaluation;";

        sqlAdapter.sqlCall(sql, function (evaluationRes) {
            
            evaluation_id = evaluationRes[1][0].LAST_INSERT_ID;
            let id_count = 0;
            for (let i = 0; i < evaluationRes[2].length; i++) {
                if (evaluationRes[2][i].evaluation_id == evaluation_id) {
                    id_count++;
                }
            }
            
            expect(id_count).toEqual(1);
            done();
        });
    });

    afterEach(done => {
        const resetTable = `DELETE FROM evaluation`
            + ` WHERE evaluation_id = ${evaluation_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

});

/**
 * @testedapi POST /evaluation/update/response?evaluation_id={eid}&question_id={qid}
 * @description 3 test cases in total
 */
describe("POST /evaluation/update/response?evaluation_id={eid}&question_id={qid}", () => {

    // Evaluation and question ID assumed to be valid
    const rate_chosen_upper = 5;
    const rate_chosen_lower = 1;
    const response_comment = "Test comment.";
    const evaluation_id = 1;
    const question_id = 1;

    // Upper bound on-point of rate range
    const inputUpper = "INSERT INTO evaluation_response (rate_chosen, response_comment, evaluation_id, question_id) "
        + "VALUES(" + rate_chosen_upper + ",\""
        + response_comment + "\"," 
        + evaluation_id + ","
        + question_id + ")";
    // Lower bound on-point of rate range
    const inputLower = "INSERT INTO evaluation_response (rate_chosen, response_comment, evaluation_id, question_id) "
        + "VALUES(" + rate_chosen_lower + ",\""
        + response_comment + "\"," 
        + evaluation_id + ","
        + question_id + ")";
    
    const inputCheck = "SELECT * FROM evaluation_response WHERE evaluation_id = " + evaluation_id
        + " AND question_id = " + question_id;

    const resetTable = "DELETE FROM evaluation_response"
        + " WHERE evaluation_id = " + evaluation_id
        + " AND question_id = " + question_id;

    afterEach(done => {
        sqlAdapter.sqlCall(resetTable, function(res) {
            done();
        })
    });
    
    test("Should correctly store the new response in the database", done => {
        sqlAdapter.sqlCall(inputUpper, function(inputRes) {
            sqlAdapter.sqlCall(inputCheck, function(checkRes) {
                expect(checkRes[0].rate_chosen).toEqual(rate_chosen_upper);
                expect(checkRes[0].response_comment).toEqual(response_comment);
                done();
            });
        });
    })

    test("Should be successful for the lowest possible rate (lower bound on point)", done => {
        sqlAdapter.sqlCall(inputUpper, function(inputRes) {
            expect(inputRes).not.toBeUndefined();
            done();
        });
    });
    
    test("Should be successful for the highest possible rate (upper bound on point)", done => {
        sqlAdapter.sqlCall(inputLower, function(inputRes) {
            expect(inputRes).not.toBeUndefined();
            done();
        });
    });
});

/**
 * @testedapi POST /evaluation/update/title?evaluation_id={id}
 * @description 1 test case in total
 */
describe("POST /evaluation/update/title?evaluation_id={id}", () => {

    const evaluation_title = "St.Arthur Evaluation v2";
    const evaluation_summary = "Requires a second audit";
    const evaluation_id = 1;
   
    // const input = "INSERT INTO evaluation (evaluation_title, evaluation_summary) "
    //     + "VALUES(" + evaluation_title + ",\""
    //     + evaluation_summary + ")"; 
    const input = "UPDATE evaluation "
        + "SET evaluation_title = \"" + evaluation_title
        + "\", evaluation_summary = \"" + evaluation_summary + "\" "
        + "WHERE evaluation_id = " + evaluation_id;
        
    const inputCheck = "SELECT * FROM evaluation WHERE evaluation_id = " + evaluation_id ;
    
    const resetTable = "UPDATE evaluation "
        + "SET evaluation_title = \"St. Arthur Evaluation\", "
        + "evaluation_summary = \"This evaluation is good.\" "
        + "WHERE evaluation_id = 1";

    afterEach(done => {
        sqlAdapter.sqlCall(resetTable, function(res) {
            done();
        })
    });
    
    test("Should store the new title and summary in the database", done => {
        sqlAdapter.sqlCall(input, function(inputRes) {
            sqlAdapter.sqlCall(inputCheck, function(checkRes) {
                expect(checkRes[0].evaluation_title).toEqual(evaluation_title);
                expect(checkRes[0].evaluation_summary).toEqual(evaluation_summary);
                done();
            });
        });
    })

});

/**
 * @testedapi Get /evaluation
 * @description 1 test case in total
 */
describe("Get /evaluation", () => {
    test("evaluation_completed must be 0 or 1", done => {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;";
        let isTrue = true;
        sqlAdapter.sqlCall(sql, function (evaluationRes) {
            for (let i = 0; i < evaluationRes.length; i++) {
                if (!(evaluationRes[i].evaluation_completed == 0 || evaluationRes[i].evaluation_completed == 1))
                    isTrue = false;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });
});

/**
 * @testedapi GET /evaluation?evaluation_id={eid}&question_id={qid}
 * @description 2 test cases in total
 */
describe("GET /evaluation?evaluation_id={eid}&question_id={qid}", () => {
    test("It should return 5 rates", done => {

        const evaluation_id = 1;
        const question_id = 1;
        const sql = "SELECT * "
        + "FROM framework_section_question "
        + "WHERE question_id = " + question_id + ";"

        sqlAdapter.sqlCall(sql, function (rateRes) {
            let count = 0;
            let questionRes = rateRes[0];
            if (questionRes.rate_1_criterion != null)
                count++;
            if (questionRes.rate_2_criterion != null)
                count++;
            if (questionRes.rate_3_criterion != null)
                count++;
            if (questionRes.rate_4_criterion != null)
                count++;
            if (questionRes.rate_5_criterion != null)
                count++;
            expect(count).toEqual(5);
            done();
        });
    });

    test("rate_chosen can only be 0-5", done => {

        const sql = "SELECT * FROM evaluation_response;"
        let isTrue = true;
        sqlAdapter.sqlCall(sql, function (rateRes) {
            for (let i = 0; i < rateRes.length; i++) {
                if (!(rateRes[i].rate_chosen == 0 || rateRes[i].rate_chosen == 1 || rateRes[i].rate_chosen == 2 || rateRes[i].rate_chosen == 3 || rateRes[i].rate_chosen == 4 || rateRes[i].rate_chosen == 5))
                    isTrue = false;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });
});

/**
 * @testedapi GET /evaluation?evaluation_id={eid}
 * @description 1 test case in total
 */
describe("GET /evaluation?evaluation_id={eid}", () => {
    test("question_id should be unique", done => {

        let evaluation_id = 1;
        const sql = "SELECT * "
        + "FROM (evaluation LEFT JOIN framework_section ON evaluation.framework_id = framework_section.framework_id) " 
        + "LEFT JOIN framework_section_question ON framework_section.section_id = framework_section_question.section_id "
        + "WHERE evaluation.evaluation_id = " + evaluation_id + ";"
        + "SELECT * "
        + "FROM evaluation_response "
        + "WHERE evaluation_id = " + evaluation_id + ";";

        let isTrue = true;
        sqlAdapter.sqlCall(sql, function (Res) {
            let sectionRes = Res[0];
            let question_id_array = new Map();
            let index = 0;
            for (let i = 0; i < sectionRes.length; i++) {
                if (question_id_array.has(sectionRes[i].question_id)) {
                    isTrue = false;
                }
                question_id_array.set(sectionRes[i].question_id, index);
                index++;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });
});
