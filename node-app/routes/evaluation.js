var express = require('express');
var router = express.Router();

var sqlConnector = require('./sqlConnector');

//Evaluation Home page
router.get('/', function(req, res, next) 
{
    const sql = "SELECT e.Evaluation_ID, e.Evaluation_Author, e.Evaluation_Title, e.Evaluation_CreationTime, "
    + "e.Evaluation_ModifiedTime, e.Evaluation_Summary, e.Evaluation_Completed, e.Framework_ID, f.Framework_Title "
    + "FROM evaluation e, framework f WHERE e.Framework_ID = f.Framework_ID;"
    sqlConnector.sqlCall(sql, function(sqlRes) 
    {
        res.send(sqlRes);
    });
});

//New evaluation page
router.get('/new', function(req, res, next) 
{
    // Select an question to redirect to rate page
    // Example: http://localhost:3001/evaluation/new?framework_id=1&question_id=1
    if(req.query.framework_id != null && req.query.question_id != null)
    {
        // return all rates of the chosen question
        const sql = "SELECT * "
            + "FROM framework_sections_questions_rate "
            + "WHERE Question_ID = " + req.query.question_id;
        
        sqlConnector.sqlCall(sql, function(rateRes)
        {
            // Format output into hierarchies
            let ridToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.Question_ID = req.query.question_id;
            cleanRes.Rates = [];

            for (let i =0; i <rateRes.length; i++)
            {
                let r = rateRes[i];
                let rid = r.Rate_ID;

                // Initialise new section
                if (!ridToIndex.has(rid)) 
                {
                    ridToIndex.set(rid, index);
                    let cleanRate = 
                    {
                        'Rate_ID': rid,
                        'Rate_Title': r.Rate_Title,
                        'Rate_Criterion': r.Rate_Criterion
                    };
                    cleanRes.Rates[index++] = cleanRate;
                }
            }

            res.send(cleanRes);
        });       
    }

    // Select an active framwork to generate evaluation
    // Example: http://localhost:3001/evaluation/new?framework_id=1
    else if (req.query.framework_id != null) 
    {
        // Return all data of the chosen framework
        const sql = "SELECT * "
            + "FROM framework_sections JOIN framework_sections_questions "
            + "ON framework_sections.Section_ID = framework_sections_questions.Section_ID "
            + "WHERE framework_sections.Framework_ID = " + req.query.framework_id + "AND Framework_ActiveStatus";
        sqlConnector.sqlCall(sql, function(questionRes) 
        {
            
            // Format output into hierarchies
            let sidToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.Framework_ID = req.query.framework_id;
            cleanRes.Sections = [];

            for (let i = 0; i < questionRes.length; i++) 
            {

                let q = questionRes[i];
                let sid = q.Section_ID;

                // Initialise new section
                if (!sidToIndex.has(sid)) 
                {
                    sidToIndex.set(sid, index);
                    let cleanSection = 
                    {
                        'Section_ID': sid,
                        'Section_Title': q.Section_Title,
                        'Questions': []
                    };
                    cleanRes.Sections[index++] = cleanSection;
                }

                // Insert formatted question into section
                let cleanQuestion = 
                {
                    'Question_ID': q.Question_ID,
                    'Question_Title': q.Question_Title
                };
                cleanRes.Sections[sidToIndex.get(sid)].questions.push(cleanQuestion);
            }

            res.send(cleanRes);

        });
    } 
    else 
    {
        // Default; return all active frameworks
        const sql = "SELECT * FROM framework WHERE Framework_ActiveStatus = 1";
        sqlConnector.sqlCall(sql, function(frameworkRes) 
        {
            res.send(frameworkRes);
        });
    }
});

module.exports = router;