var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');
var jsonUtils = require('../utils/jsonUtils');
const { response } = require('express');

const unsuccessful = "The call to the SQL database was unsuccessful.";
const successful = "The call to the SQL database was successful."

router.get('/', function (req, res, next) {

    if (req.query.framework_id != null) {
        // Example: http://localhost:3001/framework?framework_id=1
        // Returns single framework with sections and questions
        // Execute 2 sql statements.
        // 1. Return framework details from framework table
        const sql = "SELECT * "
            + "FROM framework "
            + "WHERE framework_id = " + req.query.framework_id + ";"
        // 2. Return sections and questions.
            + "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = " + req.query.framework_id;

        sqlAdapter.sqlCall(sql, function (frameworkhomepageRes) {

            if (frameworkhomepageRes == null) {
                res.send(unsuccessful);
                return;
            }

            // Store hierarchy inside JSON object with framework_id
            let cleanRes = {};
            let frameworkRes = frameworkhomepageRes[0][0];
            console.log(frameworkRes);
            let questionRes = frameworkhomepageRes[1];
            cleanRes.framework_id = frameworkRes.framework_id;
            cleanRes.framework_title = frameworkRes.framework_title;
            cleanRes.framework_author = frameworkRes.framework_author;
            cleanRes.framework_creation_time = frameworkRes.framework_creation_time;
            cleanRes.framework_active_status = frameworkRes.framework_active_status;
            cleanRes.framework_published = frameworkRes.framework_published;
            cleanRes.sections = jsonUtils.formatSectionHierarchy(questionRes);
            res.send(cleanRes);
        });

    } 

    else if (req.query.question_id != null) 
    {
        // Example: http://localhost:3001/framework?question_id=1
        // Returns all details about a question
        const sql = "SELECT * "
            + "FROM framework_section_question "
            + "WHERE question_id = " + req.query.question_id;
        sqlAdapter.sqlCall(sql, function (rateRes) 
        {

            if (rateRes == null) 
            {
                res.send(unsuccessful);
                return;
            }

            res.send(rateRes);
        });
    }

    else {

        // Default; return all frameworks
        const sql = "SELECT * FROM framework";
        sqlAdapter.sqlCall(sql, function (frameworkRes) {

            if (frameworkRes == null) {
                res.send(unsuccessful);
                return;
            }

            res.send(frameworkRes);
            
        });

    }
});

//Create a new framework page
router.get('/new', function (req, res, next) {

        // Example: http://localhost:3001/framework/new
        // 1. Create a new framework that has all default values
        const sqlFramework = "INSERT INTO framework VALUES ();"
        // 2. Return the framework_id of newly created framework
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
        // 3. Return general information of the newly created framework
            + "SELECT f.framework_title FROM framework f WHERE f.framework_id = (SELECT LAST_INSERT_ID());"

            sqlAdapter.sqlCall(sqlFramework, function (sqlRes) {

                if (sqlRes == null) {
                    res.send(unsuccessful);
                    return;
                }

                res.send(sqlRes);
            });
});
    

// For new blank section in new framework page
router.get('/section/new', function (req, res, next) {

            // Example: http://localhost:3001/framework/section/new?framework_id=1 
            if(req.query.framework_id != null){
            let framework_id = req.query.framework_id;
            // 1. Create a new section that has all default values
            const sqlSection = "INSERT INTO framework_section (framework_id) VALUES (" + framework_id + ");"
            // 2. Return the section_id of newly created section
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created section
            + "SELECT s.section_title FROM framework_section s WHERE s.section_id = (SELECT LAST_INSERT_ID());"

            sqlAdapter.sqlCall(sqlSection, function (sqlRes) {

                if (sqlRes == null) {
                    res.send(unsuccessful);
                    return;
                }

                res.send(sqlRes);
            });
        }
});

//For new blank question
router.get('/section/question/new', function (req, res, next){

            // Example: http://localhost:3001/framework/section/question/new?section_id=1
            if(req.query.section_id!= null){
            let section_id = req.query.section_id;
            // 1. Create a new question that has all default values
            const sqlQuestion = "INSERT INTO framework_section_question (section_id) VALUES (" + section_id + ");"
            // 2. Return the question_id of newly created section
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
             // 3. Return general information of the newly created question
            + "SELECT q.question_title, "
            + "q.rate_1_criterion, q.rate_2_criterion, q.rate_3_criterion, q.rate_4_criterion, q.rate_5_criterion "
            + "FROM framework_section_question q WHERE q.question_id = (SELECT LAST_INSERT_ID());"


            sqlAdapter.sqlCall(sqlQuestion, function (sqlRes) {

                if (sqlRes == null) {
                    res.send(unsuccessful);
                    return;
                }

                res.send(sqlRes);
            });

    }
});

// Update section of the framework
router.post('/section/update', function (req, res, next) {

    // Example: http://localhost:3001/framework/section/update?section_id=1
    if (req.query.section_id != null) {
        var section_title = req.body.section_title;
        var section_id = req.query.section_id;
        const sql = "UPDATE framework_section "
        + "SET section_title = '" + section_title
        + "' WHERE section_id = " + section_id ;

        sqlAdapter.sqlCall(sql, function (updateSection) {
            if (updateSection == null) {
                res.send(unsuccessful);
                return;
            }

            res.send(successful);
        });
    }
});

//Update framework details 
router.post('/update', function(req, res, next){
   // Example: http://localhost:3001/framework/update?framework_id=1 
   if (req.query.framework_id != null) {
    var framework_title = req.body.framework_title;
    var framework_id = req.query.framework_id;
    const sql = "UPDATE framework "
    + "SET framework_title = \"" + framework_title
    + "\" WHERE framework_id = " + framework_id;
   
    sqlAdapter.sqlCall(sql, function (updateFramework) {
        if (updateFramework == null) {
            res.send(unsuccessful);
            return;
        }

        res.send(successful);
    });
}
});

//Update question 
router.post('/section/question/rate/update', function (req, res, next) {
    // Example: http://localhost:3001/framework/section/question/rate/update?question_id={qid}
    if (req.query.question_id != null) {
        var rate_1_criterion = req.body.rate_1_criterion;
        var rate_2_criterion = req.body.rate_2_criterion;
        var rate_3_criterion = req.body.rate_3_criterion;
        var rate_4_criterion = req.body.rate_4_criterion;
        var rate_5_criterion = req.body.rate_5_criterion;
        var question_id = req.query.question_id;
        console.log(rate_1_criterion);
        const sql = "UPDATE framework_section_question "
            + "SET rate_1_criterion = '" + rate_1_criterion
            + "', rate_2_criterion = '" + rate_2_criterion
            + "', rate_3_criterion = '" + rate_3_criterion
            + "', rate_4_criterion = '" + rate_4_criterion
            + "', rate_5_criterion = '" + rate_5_criterion
            + "' WHERE question_id = " + question_id;
        sqlAdapter.sqlCall(sql, function (updateQuestion) {
            if (updateQuestion == null) {
                res.send(unsuccessful);
                return;
            }
            res.send(successful);
        });
    }
});

module.exports = router;