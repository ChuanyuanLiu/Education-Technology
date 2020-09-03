var express = require('express');
var router = express.Router();

var sqlConnector = require('./sqlConnector');

router.get('/', function(req, res, next) {
    if (req.query.framework_id != null) {

        // Detailed; Returns single framework with sections and questions
        // sql = "SELECT * FROM framework WHERE framework_id = " + req.query.framework_id;
        const sql = "SELECT * "
            + "FROM framework_sections JOIN framework_sections_questions "
            + "ON framework_sections.Section_ID = framework_sections_questions.Section_ID "
            + "WHERE framework_sections.Framework_ID = " + req.query.framework_id;
        sqlConnector.sqlCall(sql, function(questionRes) {
            
            // Format output into hierarchies
            let sidToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.Framework_ID = req.query.framework_id;
            cleanRes.sections = [];
            console.log(questionRes);

            for (let i = 0; i < questionRes.length; i++) {

                let q = questionRes[i];
                let sid = q.Section_ID;

                // Initialise new section
                if (!sidToIndex.has(sid)) {
                    sidToIndex.set(sid, index);
                    cleanSection = {
                        'Section_ID': sid,
                        'Section_Title': q.Section_Title,
                        'questions': []
                    };
                    cleanRes.sections[index++] = cleanSection;
                }

                // Insert formatted question into section
                let cleanQuestion = {
                    'Question_ID': q.Question_ID,
                    'Question_Title': q.Question_Title
                };
                cleanRes.sections[sidToIndex.get(sid)].questions.push(cleanQuestion);

            }

            res.send(cleanRes);

        });

    } else {

        // Default; return all frameworks
        const sql = "SELECT * FROM framework";
        sqlConnector.sqlCall(sql, function(frameworkRes) {
            res.send(frameworkRes);
        });

    }
});
  
module.exports = router;