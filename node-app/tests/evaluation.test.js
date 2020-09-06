var sqlConnector = require('../routes/sqlConnector');

afterAll(() => {
    sqlConnector.closeConnection();
});

describe("GET /evaluation/new", () => {

    const input = "SELECT * FROM framework WHERE framework_active_status = 1";

    test("Should return a defined object", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).not.toBeUndefined();
            done();
        });
    });
    
    test("Should return an array", done => {
        sqlConnector.sqlCall(input, function(res) {
            expect(res).toEqual(
                expect.arrayContaining([])
            );
            done();
        });
    });
    
    test("Should return only active frameworks", done => {
        sqlConnector.sqlCall(input, function(res) {
            if (res.length >= 0) {
                for(let i = 0; i < res.length; i++) {
                    expect(res[i].framework_active_status).toEqual(1);
                }
            }
            done();
        });
    });

    test("Should not return duplicate frameworks", done => {
        sqlConnector.sqlCall(input, function(res){
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
    
    const resetTable = "TRUNCATE TABLE evaluation_response";

    // afterEach(done => {
    //     sqlConnector.sqlCall(resetTable, function(res) {
    //         done();
    //     })
    // });
    
    test("Should corrently store the new response in the database", done => {
        sqlConnector.sqlCall(inputUpper, function(inputRes) {
            sqlConnector.sqlCall(inputCheck, function(checkRes) {
                expect(checkRes[0].rate_chosen).toEqual(rate_chosen_upper);
                expect(checkRes[0].response_comment).toEqual(response_comment);
                done();
            });
        });
    })

    test("Should be successful for the lowest possible rate (lower bound on point)", done => {
        sqlConnector.sqlCall(inputUpper, function(inputRes) {
            expect(inputRes).not.toBeUndefined();
            done();
        });
    });

    test("Should be successful for the highest possible rate (upper bound on point)", done => {
        sqlConnector.sqlCall(inputLower, function(inputRes) {
            expect(inputRes).not.toBeUndefined();
            done();
        });
    });

});

describe("POST /evaluation/update/title?evaluation_id={id}", () => {

    const evaluation_title = "St. Arthur Evalutaion";
    const evaluation_summary = "Requires a second audit";
    const evaluation_id = 1;
   
    const inputUpper = "INSERT INTO evaluation (evaluation_title, evaluation_summary) "
        + "VALUES(" + evaluation_title + ",\""
        + evaluation_summary + ")"; 
        
    const inputCheck = "SELECT * FROM evaluation WHERE evaluation_id = " + evaluation_id ;
    
    const resetTable = "TRUNCATE TABLE evaluation";

    afterEach(done => {
        sqlConnector.sqlCall(resetTable, function(res) {
            done();
        })
    });
    
    test("Should store the new title and summary in the database", done => {
        sqlConnector.sqlCall(inputUpper, function(inputRes) {
            sqlConnector.sqlCall(inputCheck, function(checkRes) {
                expect(checkRes[0].evaluation_title).toEqual(evaluation_title);
                expect(checkRes[0].evaluation_summary).toEqual(evaluation_summary);
                done();
            });
        });
    })

   });

