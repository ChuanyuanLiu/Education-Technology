/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to process all the back-end logic related to the evaluation business function
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

// Import the required modules
var express = require('express');
var router = express.Router();

var sqlAdapter = require('../dataSource/sqlAdapter');
var jsonUtils = require('../utils/jsonUtils');

// Define SqlCall execution result statements 
const UNSUCCESSFUL = "The call to the SQL database was unsuccessful.";
const SUCCESSFUL = "The call to the SQL database was successful."

/**
 * @description API for displaying information of evaluations
 *              If SqlCall excutes successfully, send the corresponding result. If not, send UNSUCCESSFUL
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/', function (req, res, next) {

    /**
     * @api: GET /evaluation?evaluation_id={eid}&question_id={qid}
     * @description API for getting the rate for chosen questions included response.
     * @example http://localhost:3001/evaluation?evaluation_id=1&question_id=1
     * @param {number} req.query.evaluation_id - evalaution_id
     * @param {number} req.query.question_id - question_id
     */
    if (req.query.evaluation_id != null && req.query.question_id != null) {

        // return all rates of the chosen question
        const sql = "SELECT * "
            + "FROM framework_section_question "
            + "WHERE question_id = " + req.query.question_id + ";"
            + "SELECT *"
            + "FROM evaluation_response "
            + "WHERE question_id = " + req.query.question_id + " AND evaluation_id = " + req.query.evaluation_id + ";";

        sqlAdapter.sqlCall(sql, function (rateRes) {

            // If SqlCall excutes unseccessfully
            if (rateRes == null || JSON.stringify(rateRes) == '[[],[]]') {
                // send UNSECCESSFUL information
                res.send(UNSUCCESSFUL);
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
            } else {
                cleanRes.rate_chosen = responseRes[0].rate_chosen;
                cleanRes.response_comment = responseRes[0].response_comment;
            }

            cleanRes.rates = [];

            for (let i = 0; i < questionRes.length; i++) {
                let r = questionRes[i];
                let rate_titles = ["Not Applicable", "Below Basic", "Basic", "Adequate", "Exceptional"];
                let rate_criteria = [];
                rate_criteria.push(r.rate_1_criterion);
                rate_criteria.push(r.rate_2_criterion);
                rate_criteria.push(r.rate_3_criterion);
                rate_criteria.push(r.rate_4_criterion);
                rate_criteria.push(r.rate_5_criterion);

                // Initialise new section
                for (let i = 0; i < 5; i++) {
                    let cleanRate = {
                        'rate_number': i + 1,
                        'rate_title': rate_titles[i],
                        'rate_criterion': rate_criteria[i]
                    };
                    cleanRes.rates[index++] = cleanRate;
                }
            }
            
            // Send the result.
            res.send(cleanRes);
        });
    }

    /**
     * @api: GET /evaluation?evaluation_id={eid}
     * @description API for getting all information of an evaluation
     * @example http://localhost:3001/evaluation?evaluation_id=1
     * @param {number} req.query.evaluation_id - evalaution_id
     */
    else if (req.query.evaluation_id != null) {
        // Excute 2 SQL statements:
        // 1. Return general data about this evaluation.
        const evalSql = "SELECT * FROM evaluation e WHERE e.evaluation_id = " + req.query.evaluation_id;

        sqlAdapter.sqlCall(evalSql, function (evalRes) {
            // If SqlCall excutes unseccessfully
            if (evalRes == null || JSON.stringify(evalRes) == '[]') {
                // Send UNSUCCESSFUL information
                res.send(UNSUCCESSFUL);
                return;
            }

            const fid = evalRes[0].framework_id;

            // 2. Return detailed information about evaluation's responses.
            const respSql = "SELECT *, q.question_id AS defined_question_id "
                + "FROM (framework_section s JOIN framework_section_question q "
                + "ON s.section_id = q.section_id "
                + "AND s.framework_id = " + fid + ") "
                + "LEFT JOIN evaluation_response r "
                + "ON q.question_id = r.question_id "
                + "AND r.evaluation_id = " + req.query.evaluation_id;

            sqlAdapter.sqlCall(respSql, function (respRes) {
                // If SqlCall excutes unseccessfully
                if (respRes == null || JSON.stringify(respRes) == '[]') {
                    // Send UNSUCCESSFUL information
                    res.send(UNSUCCESSFUL);
                    return;
                }

                let cleanRes = evalRes[0];
                cleanRes.sections = jsonUtils.formatSectionHierarchy(respRes, true);

                // Update the completed status to 1(true) if all sections are completed
                if (cleanRes.evaluation_completed == 0) {
                    let evaluation_completed = 1;
                    for (let i = 0; i < cleanRes.sections.length; i++) {
                        if (cleanRes.sections[i].section_completed == 0) {
                            evaluation_completed = 0;
                            break;
                        }
                    }

                    cleanRes.evaluation_completed = evaluation_completed;

                    // Update the database if all sections are completed
                    if (evaluation_completed == 1) {

                        const updateCompletedSql = "UPDATE evaluation SET evaluation_completed = 1 WHERE evaluation_id = " + req.query.evaluation_id;
                        sqlAdapter.sqlCall(updateCompletedSql, function (updateCompletedRes) {
                            // If SqlCall excutes unseccessfully
                            if (updateCompletedRes == null || JSON.stringify(updateCompletedRes) == '[]') {
                                // Send UNSUCCESSFUL information
                                res.send(UNSUCCESSFUL);
                                return;
                            }
                        });
                    }
                }

                // Send the result
                res.send(cleanRes);
            });
        });

    }

    /**
     * @api: GET /evaluation
     * @description API for returning a list of all evaluations.
     * @example http://localhost:3001/evaluation
     */
    else {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.framework_id = f.framework_id;"
        sqlAdapter.sqlCall(sql, function (sqlRes) {
            // If SqlCall excutes unseccessfully
            if (sqlRes == null) {
                // Send UNSUCCESSFUL information
                res.send(UNSUCCESSFUL);
                return;
            }

            // Send result
            res.send(sqlRes);
        });
    }
});

/**
 * @description API for newing evaluations
 *              If SqlCall excutes successfully, send the corresponding result. If not, send UNSUCCESSFUL
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/new', function (req, res, next) {

    /**
     * @api: GET /evaluation/new?framework_id={id}&author_name={author_name}
     * @description API for generating a new evaluation
     *              Select an active and finalised framework to generate evaluation
     * @example http://localhost:3001/evaluation/new?framework_id=1&author_name=Tony
     * @param {number} req.query.framework_id - framework_id used to generate the evaluation
     * @param {string} req.query.author_name - author_name used to generate the evaluation
     */
    if (req.query.framework_id != null && req.query.author_name != null) {
        // Excute 4 SQL statements:
        // 1. Create a new evaluation, Insert a new evaluation_id
        const sql = "INSERT INTO evaluation ( framework_id, evaluation_author ) VALUES ( " + req.query.framework_id + ", '" + req.query.author_name + "' );"
            // 2. Return the evaluation_id of newly created evaluation
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created evaluation
            + "SELECT * FROM evaluation e WHERE e.evaluation_id = (SELECT LAST_INSERT_ID());"
            // 4. Return detailed information about newly created evaluation's responses.
            + "SELECT *, q.question_id AS defined_question_id "
            + "FROM (framework_section s JOIN framework_section_question q "
            + "ON s.section_id = q.section_id "
            + "AND s.framework_id = " + req.query.framework_id + ") "
            + "LEFT JOIN evaluation_response r "
            + "ON q.question_id = r.question_id "
            + "AND r.evaluation_id = LAST_INSERT_ID()";

        sqlAdapter.sqlCall(sql, function (sqlRes) {

            if (sqlRes == null || JSON.stringify(sqlRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            let cleanRes = sqlRes[2][0];
            // Format the section Hierarchy
            cleanRes.sections = jsonUtils.formatSectionHierarchy(sqlRes[3], true);

            res.send(cleanRes);

        });

    } else {

        /**
         * @api: GET /evaluation/new
         * @description API for returning all active and finalised frameworks.
         * @example http://localhost:3001/evaluation/new
         */
        const sql = "SELECT * FROM framework WHERE framework_active_status = 1 AND framework_finalised = 1";
        sqlAdapter.sqlCall(sql, function (frameworkRes) {
            if (frameworkRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(frameworkRes);
        });

    }
});

/**
 * @api POST /evaluation/update/title?evaluation_id={id}
 * @description API for Updating an evaluation's title and summary
 *              If SqlCall excutes successfully, send SUCCESSFUL. If not, send UNSUCCESSFUL
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.post('/update/title', function (req, res, next) {
    let id = req.query.evaluation_id;
    let title = req.body.evaluation_title;
    let summary = req.body.evaluation_summary;

    const sql = "UPDATE evaluation "
        + "SET evaluation_title = '" + title
        + "', evaluation_summary = '" + summary
        + "' WHERE evaluation_id = " + id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null || JSON.stringify(updateRes) == '[]') {
            res.send(UNSUCCESSFUL);
            return;
        }

        res.send(SUCCESSFUL);
    });
});

/**
 * @api /evaluation/update/response?evaluation_id={id}&question_id={id}
 * @description API for updating an evaluation's question
 *              If SqlCall excutes successfully, send SUCCESSFUL. If not, send UNSUCCESSFUL
 * @example http://localhost:3001/evaluation/update/response?evaluation_id=1&question_id=12
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {number} evaluation_id - evaluation_id
 * @param {number} question_id - question_id
 */
router.post('/update/response', function (req, res, next) {
    if (req.query.evaluation_id != null && req.query.question_id != null) {
        var rate_chosen = req.body.rate_chosen;
        var response_comment = req.body.response_comment;
        var evaluation_id = req.query.evaluation_id;
        var question_id = req.query.question_id;
        const sql = "INSERT INTO evaluation_response (question_id, rate_chosen, response_comment, evaluation_id) "
            + "VALUES(" + question_id + "," + rate_chosen + ",\"" + response_comment + "\"," + evaluation_id + ") "
            + "ON DUPLICATE KEY UPDATE rate_chosen = " + rate_chosen + ", response_comment = \"" + response_comment + "\";";

        sqlAdapter.sqlCall(sql, function (updateResponse) {
            if (updateResponse == null || JSON.stringify(updateResponse) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });

    }
});

/**
 * @api POST /evaluation/finalised/update?evaluation_id={id}
 * @description API for updating the unfinalised evaluation as finalised
 *              If SqlCall excutes successfully, send SUCCESSFUL. If not, send UNSUCCESSFUL
 * @example http://localhost:3001/evaluation/finalised/update?evaluation_id=1
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 * @param {number} evaluation_finalised - evaluation_finalised status --- 0: Not finalised; 1: Finalised
 * @param {number} req.query.evaluation_id - question_id
 */

router.post('/finalised/update', function (req, res, next) {
    if (req.query.evaluation_id != null) {
        let evaluation_finalised = req.body.evaluation_finalised;
        const sql = "UPDATE evaluation "
            + "SET evaluation_finalised = " + evaluation_finalised
            + " WHERE evaluation_id = " + req.query.evaluation_id
            + " AND evaluation_finalised = 0";

        sqlAdapter.sqlCall(sql, function (updateFinalise) {
            if (updateFinalise == null || JSON.stringify(updateFinalise) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

module.exports = router;