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
        const sql = "SELECT * "
            + "FROM report "
            + "WHERE report_id = " + req.query.report_id;

        sqlAdapter.sqlCall(sql, function (reportRes) {
            if (reportRes == null || JSON.stringify(reportRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(reportRes);
        });

    }
    // Default; return all frameworks
    else
    {
        const sql = "SELECT * FROM report";
        sqlAdapter.sqlCall(sql, function (sqlRes) {
            if (sqlRes == null || JSON.stringify(sqlRes) == '[]') {
                res.send(UNSUCCESSFUL);
                return;
            }
            res.send(sqlRes);
        });
    }
});

module.exports = router;