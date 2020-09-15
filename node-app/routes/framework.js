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

module.exports = router;