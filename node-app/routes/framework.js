var express = require('express');
var router = express.Router();

var sqlConnector = require('./sqlConnector');

const unsuccessful = "The call to the SQL database was unsuccessful.";
const successful = "The call to the SQL database was successful."

router.get('/', function (req, res, next) {
    if (req.query.framework_id != null) {

        // Detailed; Returns single framework with sections and questions
        // sql = "SELECT * FROM framework WHERE framework_id = " + req.query.framework_id;
        const sql = "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = " + req.query.framework_id;
        sqlConnector.sqlCall(sql, function (questionRes) {
            if (questionRes == null) {
                res.send(unsuccessful);
                return;
            }

            // Format output into hierarchies
            let sidToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.framework_id = req.query.framework_id;
            cleanRes.sections = [];

            for (let i = 0; i < questionRes.length; i++) {

                let q = questionRes[i];
                let sid = q.section_id;

                // Initialise new section
                if (!sidToIndex.has(sid)) {
                    sidToIndex.set(sid, index);
                    cleanSection = {
                        'section_id': sid,
                        'section_title': q.section_title,
                        'questions': []
                    };
                    cleanRes.sections[index++] = cleanSection;
                }

                // Insert formatted question into section
                let cleanQuestion = {
                    'question_id': q.question_id,
                    'question_title': q.question_title
                };
                cleanRes.sections[sidToIndex.get(sid)].questions.push(cleanQuestion);

            }

            res.send(cleanRes);

        });

    } else {

        // Default; return all frameworks
        const sql = "SELECT * FROM framework";
        sqlConnector.sqlCall(sql, function (frameworkRes) {
            if (frameworkRes == null) {
                res.send(unsuccessful);
                return;
            }

            res.send(frameworkRes);
        });

    }
});

module.exports = router;