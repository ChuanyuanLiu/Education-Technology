var express = require('express');
var router = express.Router();

var sqlConnector = require('./sqlConnector');

//Evaluation Home page
router.get('/', function(req, res, next) 
{
    const sql = "SELECT e.*, f.framework_title "
    + "FROM evaluation e, framework f "
    + "WHERE e.framework_id = f.framework_id;"
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
        const sql = "select r.*, q.question_title "
            + "FROM framework_section_question_rate r, framework_section_question q "
            + "WHERE r.question_id = " + req.query.question_id + " and q.question_id = " + req.query.question_id;
        
        sqlConnector.sqlCall(sql, function(rateRes)
        {
            // Format output into hierarchies
            let ridToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.question_id = req.query.question_id;
            cleanRes.question_title = rateRes[0].question_title;
            cleanRes.rates = [];

            for (let i =0; i <rateRes.length; i++)
            {
                let r = rateRes[i];
                let rid = r.rate_id;

                // Initialise new section
                if (!ridToIndex.has(rid)) 
                {
                    ridToIndex.set(rid, index);
                    let cleanRate = 
                    {
                        'rate_id': rid,
                        'rate_title': r.rate_title,
                        'rate_criterion': r.rate_criterion
                    };
                    cleanRes.rates[index++] = cleanRate;
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
        const sql = "INSERT INTO evaluation ( framework_id ) VALUES ( " + req.query.framework_id + " );"
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            + "SELECT * "
            + "FROM framework_section JOIN framework_section_question "
            + "ON framework_section.section_id = framework_section_question.section_id "
            + "WHERE framework_section.framework_id = " + req.query.framework_id+";";
        sqlConnector.sqlCall(sql, function(questionRes) 
        {
            // Format output into hierarchies
            let evaluation_id = questionRes[1][0].LAST_INSERT_ID;
            console.log(evaluation_id);
            let sidToIndex = new Map();
            let index = 0;
            let cleanRes = {};
            cleanRes.evaluation_id = evaluation_id;
            cleanRes.framework_id = req.query.framework_id;
            cleanRes.sections = [];

            for (let i = 0; i < questionRes[2].length; i++) 
            {

                let q = questionRes[2][i];
                let sid = q.section_id;

                // Initialise new section
                if (!sidToIndex.has(sid)) 
                {
                    sidToIndex.set(sid, index);
                    let cleanSection = 
                    {
                        'section_id': sid,
                        'section_title': q.section_title,
                        'questions': []
                    };
                    cleanRes.sections[index++] = cleanSection;
                }

                // Insert formatted question into section
                let cleanQuestion = 
                {
                    'question_id': q.question_id,
                    'question_title': q.question_title
                };
                cleanRes.sections[sidToIndex.get(sid)].questions.push(cleanQuestion);
            }

            res.send(cleanRes);

        });
    } 
    else 
    {
        // Default; return all active frameworks
        const sql = "SELECT * FROM framework WHERE framework_active_status = 1";
        sqlConnector.sqlCall(sql, function(frameworkRes) 
        {
            res.send(frameworkRes);
        });
    }
});

router.post('/update/title', function(req, res, next) {

});

router.post('/update/response', function(req, res, next) {

});

module.exports = router;