/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to process all the back-end logic related to the framework business function
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

// Import the required modules
var express = require('express');
var router = express.Router();

var sqlAdapter = require('../dataSource/sqlAdapter');
var jsonUtils = require('../utils/jsonUtils');
const { response } = require('express');

// Define SqlCall execution result statements 
const UNSUCCESSFUL = "The call to the SQL database was unsuccessful.";
const SUCCESSFUL = "The call to the SQL database was successful."

/**
 * @description APIs for Framework listing logic
 *              If SqlCall excutes successfully, send the corresponding result. If not, send UNSUCCESSFUL
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/', function (req, res, next) {

    /**
    * @api: GET /framework?framework_id={id}
    * @description API for returning all information of a framework included sections and questions.
    *              If excutes successfully, returns single framework with sections and questions
    * @example http://localhost:3001/framework?framework_id=1
    * @param {number} req.query.framework_id - framework_id
    */
    if (req.query.framework_id != null) {
        // Execute 2 sql statements.
        // 1. Return framework details from framework table
        const sql = "SELECT * "
            + "FROM framework "
            + "WHERE framework_id = " + req.query.framework_id + ";"
            // 2. Return sections and questions.
            + "SELECT *, s.section_id AS defined_section_id "
            + "FROM framework_section s LEFT JOIN framework_section_question q "
            + "ON s.section_id = q.section_id "
            + "WHERE s.framework_id = " + req.query.framework_id;

        sqlAdapter.sqlCall(sql, function (frameworkhomepageRes) {

            if (frameworkhomepageRes == null || JSON.stringify(frameworkhomepageRes) == '[[],[]]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            // Store hierarchy inside JSON object with framework_id
            let cleanRes = {};
            let frameworkRes = frameworkhomepageRes[0][0];
            let questionRes = frameworkhomepageRes[1];

            cleanRes.framework_id = frameworkRes.framework_id;
            cleanRes.framework_title = frameworkRes.framework_title;
            cleanRes.framework_author = frameworkRes.framework_author;
            cleanRes.framework_creation_time = frameworkRes.framework_creation_time;
            cleanRes.framework_active_status = frameworkRes.framework_active_status;
            cleanRes.framework_finalised = frameworkRes.framework_finalised;
            cleanRes.sections = jsonUtils.formatSectionHierarchy(questionRes);

            res.send(cleanRes);
        });
    }

    /**
    * @api: GET /framework?question_id={id}
    * @description API for returning the ratings associated with a single question
    * @example http://localhost:3001/framework?question_id=1
    * @param {number} req.query.question_id - question_id
    */
    else if (req.query.question_id != null) {
        const sql = "SELECT * "
            + "FROM framework_section_question "
            + "WHERE question_id = " + req.query.question_id;
        sqlAdapter.sqlCall(sql, function (rateRes) {

            if (rateRes == null || JSON.stringify(rateRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            let Res = rateRes[0];
            let cleanRes = {};
            cleanRes.question_id = Res.question_id;
            cleanRes.question_title = Res.question_title;
            cleanRes.section_id = Res.section_id;
            cleanRes.rates = [];
            let rate_titles = ["Not Applicable", "Below Basic", "Basic", "Adequate", "Exceptional"];
            let rate_criteria = [];
            rate_criteria.push(Res.rate_1_criterion);
            rate_criteria.push(Res.rate_2_criterion);
            rate_criteria.push(Res.rate_3_criterion);
            rate_criteria.push(Res.rate_4_criterion);
            rate_criteria.push(Res.rate_5_criterion);
            for (let i = 0; i < 5; i++) {
                let cleanRate = {
                    'rate_number': i + 1,
                    'rate_title': rate_titles[i],
                    'rate_criterion': rate_criteria[i]
                };
                cleanRes.rates[i] = cleanRate;
            }

            res.send(cleanRes);
        });
    }

    /**
     * @api: GET /framework
     * @description API for returning a list of all frameworks
     * @example http://localhost:3001/framework
     */
    else {
        const sql = "SELECT * FROM framework";
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
 * @api: GET /framework/new?author_name={author_name}
 * @description API for creating a new report, returning a new framework with default framework title
 * @example http://localhost:3001/framework/new?author_name=Tony 
 * @param {number} req.query.author_name - author_name
 */
router.get('/new', function (req, res, next) {
    if (req.query.author_name != null) {
        // 1. Create a new framework that has all default values
        const sqlFramework = "INSERT INTO framework (framework_author) VALUES ('" + req.query.author_name + "');"
            // 2. Return the framework_id of newly created framework
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created framework
            + "SELECT * FROM framework WHERE framework_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlFramework, function (sqlRes) {

            if (sqlRes == null || JSON.stringify(sqlRes) == '[[],[],[]]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(sqlRes[2][0]);
        });
    }
});

/**
 * @api: GET /framework/section/new?framework_id={fid}
 * @description API for creating a new blank section for a framework, returning a new section with default values
 * @example http://localhost:3001/framework/section/new?framework_id=1 
 * @param {number} req.query.framework_id - framework_id
 */
router.get('/section/new', function (req, res, next) {
    if (req.query.framework_id != null) {
        let framework_id = req.query.framework_id;
        // 1. Create a new section that has all default values
        const sqlSection = "INSERT INTO framework_section (framework_id) VALUES (" + framework_id + ");"
            // 2. Return the section_id of newly created section
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created section
            + "SELECT s.section_title FROM framework_section s WHERE s.section_id = (SELECT LAST_INSERT_ID());"

        sqlAdapter.sqlCall(sqlSection, function (sqlRes) {

            if (sqlRes == null || JSON.stringify(sqlRes) == '[[],[],[]]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            let cleanRes = {};
            cleanRes.section_id = sqlRes[1][0].LAST_INSERT_ID;
            cleanRes.section_title = sqlRes[2][0].section_title;

            res.send(cleanRes);
        });
    }
});

/**
 * @api: GET /framework/section/question/new?section_id={sid}
 * @description API for creating a new blank question for a section, returning a new question with default details
 * @example http://localhost:3001/framework/section/question/new?section_id=1
 * @param {number} req.query.section_id - section_id
 */
router.get('/section/question/new', function (req, res, next) {
    if (req.query.section_id != null) {
        let section_id = req.query.section_id;
        // 1. Create a new question that has all default values
        const sqlQuestion = "INSERT INTO framework_section_question (section_id) VALUES (" + section_id + ");"
            // 2. Return the question_id of newly created section
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created question
            + "SELECT q.question_title FROM framework_section_question q WHERE q.question_id = (SELECT LAST_INSERT_ID());"
        
        sqlAdapter.sqlCall(sqlQuestion, function (sqlRes) {
            if (sqlRes == null || JSON.stringify(sqlRes) == '[[],[],[]]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            let cleanRes = {};
            cleanRes.question_id = sqlRes[1][0].LAST_INSERT_ID;
            cleanRes.question_title = sqlRes[2][0].question_title;

            res.send(cleanRes);
        });
    }
});

/**
 * @api: POST /framework/section/update?section_id={sid}
 * @description API for updating the section title for a framework
 * @param {number} req.query.section_id - section_id
 * @param {string} req.body.section_title - section_title
 */
router.post('/section/update', function (req, res, next) {
    if (req.query.section_id != null) {
        var section_title = req.body.section_title;
        var section_id = req.query.section_id;
        const sql = "UPDATE framework_section "
            + "SET section_title = '" + section_title
            + "' WHERE section_id = " + section_id;

        sqlAdapter.sqlCall(sql, function (updateSection) {
            if (updateSection == null || JSON.stringify(updateSection) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: GET /framework/section/delete?section_id={sid}
 * @description API for deleting a section from a framework
                NOTE: all questions inside the section as well as section will be deleted
 * @example http://localhost:3001/framework/section/delete?section_id=1
 * @param {number} req.query.section_id - section_id
 */
// Delete the section of the framework
router.get('/section/delete', function (req, res, next) {
    // First, delete all the questions inside the section
    if (req.query.section_id != null) {
        var section_id = req.query.section_id;
        const sql1 = "DELETE FROM framework_section_question "
            + "WHERE section_id = " + section_id;

        sqlAdapter.sqlCall(sql1, function (deleteSection) {
            if (deleteSection == null || JSON.stringify(deleteSection) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            // Then, delete the section
            const sql2 = "DELETE FROM framework_section "
                + "WHERE section_id = " + section_id;
            sqlAdapter.sqlCall(sql2, function (deleteSection2) {
                if (deleteSection2 == null || JSON.stringify(deleteSection2) == '[]') {
                    res.send(UNSUCCESSFUL);
                    return;
                }

                res.send(SUCCESSFUL);
            });
        });
    }
});

/**
 * @api: POST /framework/update?framework_id={fid}
 * @description API for updating the title of the framework 
 * @param {number} req.query.framework_id - framework_id
 * @param {string} req.body.framework_title - framework_title
 * @param {string} req.body.framework_id - framework_id
 */
router.post('/update', function (req, res, next) {
    if (req.query.framework_id != null) {
        var framework_title = req.body.framework_title;
        var framework_id = req.query.framework_id;
        const sql = "UPDATE framework "
            + "SET framework_title = \"" + framework_title
            + "\" WHERE framework_id = " + framework_id;
        sqlAdapter.sqlCall(sql, function (updateFramework) {
            if (updateFramework == null || JSON.stringify(updateFramework) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: GET /framework/version?framework_id={id}
 * @description API for version control function.
                Creates a new framework and copied all data from the previous framework.
                Returns single framework with sections and questions
 * @example http://localhost:3001/framework/version?framework_id=1
 * @param {number} req.query.framework_id - framework_id
 */
router.get('/version', function (req, res, next) {
    if (req.query.framework_id != null) {
        // Execute 6 sql statements.
        // 1. Create a new framework, insert the data copied from previous framework
        const sql = "INSERT INTO framework(framework_title,framework_author) "
            + "SELECT CONCAT(framework_title,' - Copy'),framework_author "
            + "FROM framework where framework_id = " + req.query.framework_id + ";"
            // 2. Return the framework_id of newly created framework
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SET @new_framework_id = (SELECT LAST_INSERT_ID());"
            // 3. Insert sections from previous framework
            + "INSERT INTO framework_section(section_title, framework_id) "
            + "SELECT section_title, @new_framework_id AS framework_id "
            + "FROM framework_section where framework_id = " + req.query.framework_id + ";"
            // 4. Insert questions from previous framework 
            + "SET @new_section_id = (SELECT LAST_INSERT_ID());"
            + "SET @old_section_id = (SELECT MIN(section_id) FROM framework_section WHERE framework_id = " + req.query.framework_id + ");"
            + "SET @diff = @new_section_id - @old_section_id;"
            + "INSERT INTO framework_section_question(question_title, section_id, rate_1_criterion, rate_2_criterion, rate_3_criterion, rate_4_criterion, rate_5_criterion) "
            + "SELECT question_title, section_id+@diff AS section_id, rate_1_criterion, rate_2_criterion, rate_3_criterion, rate_4_criterion, rate_5_criterion "
            + "FROM framework_section_question "
            + "WHERE question_id = ANY(SELECT question_id FROM framework_section_question WHERE section_id = ANY(SELECT section_id FROM framework_section WHERE framework_id = " + req.query.framework_id + "));"
            // 5. Return homepage data of new_created framework.
            + "SELECT * "
            + "FROM framework "
            + "WHERE framework_id = @new_framework_id;"
            // 6. Return sections and questions of new_created framework.
            + "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = @new_framework_id;";

        sqlAdapter.sqlCall(sql, function (frameworkversionRes) {

            if (frameworkversionRes == null || JSON.stringify(frameworkversionRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            // Store hierarchy inside JSON object with framework_id
            let cleanRes = {};
            let frameworkRes = frameworkversionRes[8][0];
            let questionRes = frameworkversionRes[9];
            cleanRes.framework_id = frameworkRes.framework_id;
            cleanRes.framework_title = frameworkRes.framework_title;
            cleanRes.framework_author = frameworkRes.framework_author;
            cleanRes.framework_creation_time = frameworkRes.framework_creation_time;
            cleanRes.framework_active_status = frameworkRes.framework_active_status;
            cleanRes.framework_finalised = frameworkRes.framework_finalised;
            cleanRes.sections = jsonUtils.formatSectionHierarchy(questionRes);

            res.send(cleanRes);
        });
    }
});

/**
 * @api: POST /framework/section/question/rate/update?question_id={qid}
 * @description API for updating the question information, namely 5 rate criteria.
 * @param {number} req.query.question_id - question_id
 */
router.post('/section/question/rate/update', function (req, res, next) {
    if (req.query.question_id != null) {
        var rate_1_criterion = req.body.rate_1_criterion;
        var rate_2_criterion = req.body.rate_2_criterion;
        var rate_3_criterion = req.body.rate_3_criterion;
        var rate_4_criterion = req.body.rate_4_criterion;
        var rate_5_criterion = req.body.rate_5_criterion;
        var question_id = req.query.question_id;
        const sql = "UPDATE framework_section_question "
            + "SET rate_1_criterion = '" + rate_1_criterion
            + "', rate_2_criterion = '" + rate_2_criterion
            + "', rate_3_criterion = '" + rate_3_criterion
            + "', rate_4_criterion = '" + rate_4_criterion
            + "', rate_5_criterion = '" + rate_5_criterion
            + "' WHERE question_id = " + question_id;
        sqlAdapter.sqlCall(sql, function (updateQuestion) {
            if (updateQuestion == null || JSON.stringify(updateQuestion) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: POST /framework/section/question/update?question_id={qid}
 * @description API for updating the question
 * @param {number} req.query.question_id - question_id
 */
router.post('/section/question/update', function (req, res, next) {

    if (req.query.question_id != null) {
        var question_id = req.query.question_id;
        var question_title = req.body.question_title;
        const sql = "UPDATE framework_section_question "
            + "SET question_title = '" + question_title
            + "' WHERE question_id = " + question_id;

        sqlAdapter.sqlCall(sql, function (updateQuestion) {
            if (updateQuestion == null || JSON.stringify(updateQuestion) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: GET /framework/section/question/delete?question_id={qid}
 * @description API for deleting a question from a section
 * @example http://localhost:3001//framework/section/question/delete?question_id=1
 * @param {number} req.query.question_id - question_id
 */
router.get('/section/question/delete', function (req, res, next) {
    if (req.query.question_id != null) {
        var question_id = req.query.question_id;
        const sql = "DELETE FROM framework_section_question "
            + "WHERE question_id = " + question_id;

        sqlAdapter.sqlCall(sql, function (deleteQuestion) {
            if (deleteQuestion == null || JSON.stringify(deleteQuestion) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: POST /framework/activestatus/update?framework_id={fid}
 * @description API for updating the active status for a framework.
 * @param {number} req.query.framework_id - framework_id
 */
router.post('/activestatus/update', function (req, res, next) {
    if (req.query.framework_id != null) {
        let framework_active_status = req.body.framework_active_status;
        const sql = "UPDATE framework "
            + "SET framework_active_status = " + framework_active_status
            + " WHERE framework_id = " + req.query.framework_id;

        sqlAdapter.sqlCall(sql, function (updateActive) {
            if (updateActive == null || JSON.stringify(updateActive) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

/**
 * @api: POST /framework/finalisedstatus/update?framework_id={fid}
 * @description API for updating the finalised status for a framework.
 * @param {number} req.query.framework_id - framework_id
 */
router.post('/finalisedstatus/update', function (req, res, next) {
    if (req.query.framework_id != null) {
        let framework_finalised_status = req.body.framework_finalised_status;
        const sql = "UPDATE framework "
            + "SET framework_finalised = " + framework_finalised_status
            + " WHERE framework_id = " + req.query.framework_id
            + " AND framework_finalised = 0";

        sqlAdapter.sqlCall(sql, function (updateActive) {
            if (updateActive == null || JSON.stringify(updateActive) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(SUCCESSFUL);
        });
    }
});

module.exports = router;