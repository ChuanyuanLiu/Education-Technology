var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');
var jsonUtils = require('../utils/jsonUtils');

const unsuccessful = "The call to the SQL database was unsuccessful.";
const successful = "The call to the SQL database was successful."

//Evaluation Home page & edit previous evaluation
router.get('/', function (req, res, next) {
    // Question_rate page, display all rates with answer and comment.
    // Example: http://localhost:3001/evaluation?evaluation_id=1&question_id=1
    if (req.query.evaluation_id != null && req.query.question_id != null) {
        // return all rates of the chosen question
        const sql = "SELECT * "
            + "FROM framework_section_question "
            + "WHERE question_id = " + req.query.question_id + ";"
            + "SELECT *"
            + "FROM evaluation_response "
            + "WHERE question_id = " + req.query.question_id + " AND evaluation_id = " + req.query.evaluation_id + ";";
        sqlAdapter.sqlCall(sql, function (rateRes) {

            if (rateRes == null) {
                res.send(unsuccessful);
                return;
            }

            // Format output into hierarchies
            let questionRes = rateRes[0];
            let responseRes = rateRes[1];
            let index = 0;
            let cleanRes = {};
            cleanRes.question_id = req.query.question_id;
            cleanRes.question_title = questionRes[0].question_title;
            // If the question has not been rated
            if (responseRes[0] == null) {
                cleanRes.rate_chosen = 0;
                cleanRes.response_comment = "";
            }
            else {
                cleanRes.rate_chosen = responseRes[0].rate_chosen;
                cleanRes.response_comment = responseRes[0].response_comment;
            }
            cleanRes.rates = [];
            for (let i = 0; i < questionRes.length; i++) 
            {
                let r = questionRes[i];
                let rate_titles = ["Not Applicable", "Below Basic", "Basic", "Adequate", "Exceptional"];
                let rate_criterias = [];
                rate_criterias.push(r.rate_1_criteria);
                rate_criterias.push(r.rate_2_criteria);
                rate_criterias.push(r.rate_3_criteria);
                rate_criterias.push(r.rate_4_criteria);
                rate_criterias.push(r.rate_5_criteria);
                // Initialise new section
                for (let i = 0; i < 5; i++)
                {
                    
                    
                    let cleanRate =
                    {
                        'rate_number': i + 1,
                        'rate_title': rate_titles[i],
                        'rate_criterion': rate_criterias[i]
                    };
                    
                    cleanRes.rates[index++] = cleanRate;
                }
                
                
            }
            res.send(cleanRes);
        });
    }

    // Choose one evaluation
    // Example: http://localhost:3001/evaluation?evaluation_id=1
    else if (req.query.evaluation_id != null) {

        // Excute 2 SQL statements:

        // 1. Return general data about this evaluation.
        const evalSql = "SELECT * FROM evaluation e WHERE e.evaluation_id = " + req.query.evaluation_id;

        sqlAdapter.sqlCall(evalSql, function (evalRes) {

            if (evalRes == null) {
                res.send(unsuccessful);
                return;
            }

            const fid = evalRes[0].framework_id;
            // 2. Return detailed information about evaluation's responses.
            const respSql = "SELECT * "
                + "FROM (framework_section s JOIN framework_section_question q "
                    + "ON s.section_id = q.section_id "
                    + "AND s.framework_id = " + fid + ") "
                + "LEFT JOIN evaluation_response r "
                + "ON q.question_id = r.question_id "
                + "AND r.evaluation_id = " + req.query.evaluation_id;

            sqlAdapter.sqlCall(respSql, function (respRes) {

                if (respRes == null) {
                    res.send(unsuccessful);
                    return;
                }

                let cleanRes = evalRes[0];
                cleanRes.sections = jsonUtils.formatSectionHierarchy(respRes, true);

                res.send(cleanRes);

            });
        });

    }
    //Evaluation Home page
    else 
    {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;"
        sqlAdapter.sqlCall(sql, function (sqlRes) {
            if (sqlRes == null) {
                res.send(unsuccessful);
                return;
            }

            res.send(sqlRes);
        });
    }

});

//New evaluation page
router.get('/new', function (req, res, next) {

    // Select an active and framwork to generate evaluation
    // Example: http://localhost:3001/evaluation/new?framework_id=1
    // Excute 3 SQL statements:
    // 1. Create a new evaluation, Insert a new evaluation_id
    // 2. Return the evaluation_id of new created evaluation
    // 3. Return all stuff of the new created evaluation
    if (req.query.framework_id != null) {

        const sql = "INSERT INTO evaluation ( framework_id ) VALUES ( " + req.query.framework_id + " );"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT * "
            + "FROM (evaluation e LEFT JOIN framework_section s ON e.framework_id = s.framework_id) " 
            + "LEFT JOIN framework_section_question q ON s.section_id = q.section_id "
            + "WHERE e.evaluation_id = (SELECT LAST_INSERT_ID())";

        sqlAdapter.sqlCall(sql, function (sqlRes) {
            
            if (sqlRes == null) {
                res.send(unsuccessful);
                return;
            }

            // Format output into hierarchies
            let evaluation_id = sqlRes[1][0].LAST_INSERT_ID;
            // console.log(evaluation_id);
            let sidToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.evaluation_id = evaluation_id;
            cleanRes.author = sqlRes[2][0].evaluation_author;
            cleanRes.evaluation_title = sqlRes[2][0].evaluation_title;
            cleanRes.evaluation_creation_time = sqlRes[2][0].evaluation_creation_time;
            cleanRes. evaluation_modified_time = sqlRes[2][0]. evaluation_modified_time;
            cleanRes.evaluation_summary = sqlRes[2][0].evaluation_summary;
            cleanRes.evaluation_completed = sqlRes[2][0].evaluation_completed;
            cleanRes.framwork_id = sqlRes[2][0].framework_id;
            cleanRes.sections = [];

            for (let i = 0; i < sqlRes[2].length; i++) {

                let q = sqlRes[2][i];
                let sid = q.section_id;

                // Initialise new section
                if (!sidToIndex.has(sid)) {
                    sidToIndex.set(sid, index);
                    let cleanSection =
                    {
                        'section_id': sid,
                        'section_title': q.section_title,
                        'questions': [],
                        'section_completed': 0
                    };
                    cleanRes.sections[index++] = cleanSection;
                }

                // Insert formatted question into section
                let cleanQuestion =
                {
                    'question_id': q.question_id,
                    'question_title': q.question_title,
                    'question_completed': 0
                };
                cleanRes.sections[sidToIndex.get(sid)].questions.push(cleanQuestion);
            }

            res.send(cleanRes);

        });
    }
    else {

        // Default; return all active frameworks
        const sql = "SELECT * FROM framework WHERE framework_active_status = 1";
        sqlAdapter.sqlCall(sql, function (frameworkRes) {
            if (frameworkRes == null) {
                res.send(unsuccessful);
                return;
            }

            res.send(frameworkRes);
        });

    }
});

// Update the title or summary of an evaluation
router.post('/update/title', function (req, res, next) {
    let id = req.query.evaluation_id;
    let title = req.body.evaluation_title;
    let summary = req.body.evaluation_summary;

    const sql = "UPDATE evaluation "
        + "SET evaluation_title = '" + title
        + "', evaluation_summary = '" + summary
        + "' WHERE evaluation_id = " + id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null) {
            res.send(unsuccessful);
            return;
        }

        console.log(updateRes);
        res.send(successful);
    });
});

// Create a new response to a question as part of an evaluation
router.post('/update/response', function (req, res, next) {

    // Example: http://localhost:3001/evaluation/update/response?evaluation_id=1&question_id=12
    if (req.query.evaluation_id != null && req.query.question_id != null) {
        console.log(req.body);
        var rate_chosen = req.body.rate_chosen;
        var response_comment = req.body.response_comment;
        var evaluation_id = req.query.evaluation_id;
        var question_id = req.query.question_id;
        const sql = "INSERT INTO evaluation_response (question_id, rate_chosen, response_comment, evaluation_id) "
            + "VALUES(" + question_id + "," + rate_chosen + ",\"" + response_comment + "\"," + evaluation_id + " "
            + "ON DUPLICATE KEY UPDATE rate_chosen = " + rate_chosen + ", response_comment = \"" + response_comment + "\";";

        sqlAdapter.sqlCall(sql, function (updateResponse) {
            if (updateResponse == null) {
                res.send(unsuccessful);
                return;
            }

            console.log(updateResponse);
            res.send(successful);
        });

    }
});

module.exports = router;