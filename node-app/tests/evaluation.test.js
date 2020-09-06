//1. Get /evaluation -- Yao

var sqlConnector = require('../routes/sqlConnector');

describe("Get /evaluation", () => {
    test("it should return all the evaluations. so count(sqlresult) should be equal to max(evaluation_id)", done => {

        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;";
        sqlConnector.sqlCall(sql, function (evaluationRes) {
            let max_evaluation_id = evaluationRes[evaluationRes.length - 1].evaluation_id;
            expect(evaluationRes.length).toEqual(max_evaluation_id);
            done();
        });
    });

    test("evaluation_completed must be 0 or 1", done => {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;";
        let isTrue = true;
        sqlConnector.sqlCall(sql, function (evaluationRes) {
            for (let i = 0; i < evaluationRes.length; i++) {
                if (!(evaluationRes[i].evaluation_completed == 0 || evaluationRes[i].evaluation_completed == 1))
                    isTrue = false;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });

    test("evaluation_id must be unique", done => {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;";
        let isTrue = true;
        sqlConnector.sqlCall(sql, function (evaluationRes) {
            let evaluation_id_array = new Map();
            let index = 0;
            for (let i = 0; i < evaluationRes.length; i++) {
                if (evaluation_id_array.has(evaluationRes[i].evaluation_id)) {
                    isTrue = false;
                }
                evaluation_id_array.set(evaluationRes[i].evaluation_id, index);
                index++;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });
});

describe("GET /evaluation?evaluation_id={eid}&question_id={qid}", () => {
    test("It should return 5 rates", done => {

        const evaluation_id = 1;
        const question_id = 1;
        const sql = "SELECT r.*, q.question_title "
            + "FROM framework_section_question_rate r, framework_section_question q "
            + "WHERE r.question_id = " + question_id + " AND q.question_id = " + question_id + ";"
            + "SELECT *"
            + "FROM evaluation_response "
            + "WHERE question_id = " + question_id + " AND evaluation_id = " + evaluation_id + "; ";

        sqlConnector.sqlCall(sql, function (rateRes) {
            let questionRes = rateRes[0];
            expect(questionRes.length).toEqual(5);
            done();
        });
    });

    test("rate_chosen can only be 0-5", done => {

        const sql = "SELECT * FROM evaluation_response;"
        let isTrue = true;
        sqlConnector.sqlCall(sql, function (rateRes) {
            for (let i = 0; i < rateRes.length; i++) {
                if (!(rateRes[i].rate_chosen == 0 || rateRes[i].rate_chosen == 1 || rateRes[i].rate_chosen == 2 || rateRes[i].rate_chosen == 3 || rateRes[i].rate_chosen == 4 || rateRes[i].rate_chosen == 5))
                    isTrue = false;
            }
            expect(isTrue).toEqual(true);
            done();
        });
    });
});

describe("GET /evaluation?evaluation_id={eid}&framework_id={fid}", () => {
    test("It should return all sections with questions namely,count(questions) should be equal to max(question_id)", done => {

        const sql = "SELECT * "
            + "FROM evaluation "
            + "WHERE evaluation_id= 1;"
            + "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = 1;";

        sqlConnector.sqlCall(sql, function (Res) {
            let sectionRes = Res[1];
            let max_question_id = sectionRes[sectionRes.length - 1].question_id;
            expect(sectionRes.length).toEqual(max_question_id);
            done();
        });
    });

    test("question_id should be unique", done => {

        const sql = "SELECT * "
            + "FROM evaluation "
            + "WHERE evaluation_id= 1;"
            + "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = 1;";

        let isTrue = true;
        sqlConnector.sqlCall(sql, function (Res) {
            let sectionRes = Res[1];
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
            sqlConnector.closeConnection();
        });
    });
});