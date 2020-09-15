var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');
var jsonUtils = require('../utils/jsonUtils');
const { response } = require('express');

const unsuccessful = "The call to the SQL database was unsuccessful.";
const successful = "The call to the SQL database was successful."

router.get('/', function (req, res, next) {
    if (req.query.framework_id != null) {

        // Detailed; Returns single framework with sections and questions
        const sql = "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = " + req.query.framework_id;

        sqlAdapter.sqlCall(sql, function (questionRes) {

            if (questionRes == null) {
                res.send(unsuccessful);
                return;
            }

            // Store hierarchy inside JSON object with framework_id
            let cleanRes = {};
            cleanRes.framework_id = req.query.framework_id;
            cleanRes.sections = jsonUtils.formatSectionHierarchy(questionRes);
            res.send(cleanRes);

        });

    } else {

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