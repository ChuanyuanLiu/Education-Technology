var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');
const { response } = require('express');
const UNSUCCESSFUL = "The call to the SQL database was unsuccessful.";
const SUCCESSFUL = "The call to the SQL database was successful."

router.get('/', function (req, res, next) {
    if(req.query.report_id != null)
    {
        // Example: http://localhost:3001/report?report_id=1
        // Returns all details about a report
        
        const sql = "SELECT r.*, e.evaluation_title "
            + "FROM report r, evaluation e "
            + "WHERE r.report_id = " + req.query.report_id + " AND r.evaluation_id = e.evaluation_id";

        sqlAdapter.sqlCall(sql, function (reportRes) {
            if (reportRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(reportRes);
        });

    }
    // Default; return all reports
    else
    {
        const sql = "SELECT r.*, e.evaluation_title FROM report r, evaluation e WHERE r.evaluation_id = e.evaluation_id";
        sqlAdapter.sqlCall(sql, function (sqlRes) {
            if (sqlRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(sqlRes);
        });
    }
});

//New report page
router.get('/new', function (req, res, next) {

    // Select a completed evaluation to generate report
    // Example: http://localhost:3001/report/new?evaluation_id=1
    // Excute 3 SQL statements:
    if (req.query.evaluation_id != null) {

        // 1. Create a new report, Insert a new evaluation_id
        const sql = "INSERT INTO report ( evaluation_id ) VALUES ( " + req.query.evaluation_id + " );"
            // 2. Return the report_id of newly created report
            + "SELECT LAST_INSERT_ID() AS 'LAST_INSERT_ID';"
            // 3. Return general information of the newly created report
            + "SELECT r.*, e.evaluation_title FROM report r, evaluation e WHERE r.evaluation_id = e.evaluation_id AND report_id = (SELECT LAST_INSERT_ID());"
 
        sqlAdapter.sqlCall(sql, function (newReportRes) {
            if (newReportRes == null || JSON.stringify(newReportRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            let cleanRes = newReportRes[2][0];
            res.send(cleanRes);
        });
    } 
    else 
    {
        // Default; return all completed evaluations.
        // Example: http://localhost:3001/report/new
        const sql = "SELECT e.*, f.framework_title "
        + "FROM evaluation e, framework f "
        + "WHERE e.evaluation_completed = 1 AND e.framework_id = f.framework_id";
        sqlAdapter.sqlCall(sql, function (evaluationRes) {
            if (evaluationRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(evaluationRes);
        });
    }
});

// Update the title of the report
router.post('/update/title', function (req, res, next) {

    const sql = "UPDATE report "
        + "SET report_title = '" + req.body.report_title
        + "' WHERE report_id = " + req.query.report_id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null || JSON.stringify(updateRes) == '[]') {
            res.send(UNSUCCESSFUL);
            return;
        }
        res.send(SUCCESSFUL);
    });
});

// Update the recommendation of the report
router.post('/update/recommendation', function (req, res, next) {

    const sql = "UPDATE report "
        + "SET report_recommendation = '" + req.body.report_recommendation
        + "' WHERE report_id = " + req.query.report_id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null || JSON.stringify(updateRes) == '[]') {
            res.send(UNSUCCESSFUL);
            return;
        }
        res.send(SUCCESSFUL);
    });
});

module.exports = router;