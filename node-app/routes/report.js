var express = require('express');
var router = express.Router();

var sqlAdapter = require('../utils/sqlAdapter');
const { response } = require('express');
const UNSUCCESSFUL = "The call to the SQL database was unsuccessful.";
const SUCCESSFUL = "The call to the SQL database was successful."

const fs = require('fs');
var sd = require('silly-datetime');

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

//Finalise report page
router.get('/finalise', function (req, res, next) {
    if(req.query.report_id != null)
    {
        // Example: http://localhost:3001/report/finalise?report_id=1

        const sql = "SELECT r.*, e.evaluation_title "
            + "FROM report r, evaluation e "
            + "WHERE r.report_id = " + req.query.report_id + " AND r.evaluation_id = e.evaluation_id";

        sqlAdapter.sqlCall(sql, function (reportRes) 
        {
            if (reportRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }
            
            let cleanRes = {};
            let report_id = reportRes[0].report_id;
            let report_author = reportRes[0].report_author;
            let report_title = reportRes[0].report_title;
            let report_creation_time = reportRes[0].report_creation_time;
            let report_modified_time = reportRes[0].report_modified_time;
            let report_recommendation = reportRes[0].report_recommendation;
            let evaluation_id = reportRes[0].evaluation_id;         
            let evaluation_title = reportRes[0].evaluation_title;       
            cleanRes.report_id = report_id;

            // TODO: We need to generate the report content, the following part is a sample content.
            // Generate the content ( \ufeff --> to avoid Garbled characters )
            var csvContent = '\ufeffreport_id,';
            csvContent += 'report_author,';
            csvContent += 'report_title,';
            csvContent += 'report_creation_time,';
            csvContent += 'report_modified_time,';
            csvContent += 'report_recommendation,';
            csvContent += 'evaluation_id,';
            csvContent += 'evaluation_title\n';
            csvContent += report_id + ',';
            csvContent += report_author + ',';
            csvContent += report_title + ',';
            csvContent += report_creation_time + ',';
            csvContent += report_modified_time + ',';
            csvContent += report_recommendation + ',';
            csvContent += evaluation_id + ',';
            csvContent += evaluation_title + '\n';
            csvContent += 'Evaluation part'

            // The .csv file is stored in '$REPORTS_FILEPATH'
            // Current filepath of .csv file is './reports/$report_id-YYYY-MM-DD-HH-mm-ss'
            var time = sd.format(new Date(), 'YYYY-MM-DD-HH-mm-ss');
            const REPORTS_DIR = './reports';
            const REPORTS_FILEPATH = REPORTS_DIR + '/' + report_id + '-' + time + '.csv';
                   
            // Generate the directory
            fs.mkdir(REPORTS_DIR, (err) => {
            })
            
            // Generate the .csv file
            fs.writeFile(REPORTS_FILEPATH, csvContent, function(err){
              if (err) 
              {
                  console.log(err, '---->csv<---')
              }
            })
            
            // If file generated successfully, save the filepath in 'report_csv' field.
            // And set 'evaluation_finalised' = 1
            const sql_updatecsv = "UPDATE report "
                    + "SET report_csv = '" + REPORTS_FILEPATH + "' "
                    + "WHERE report_id = " + report_id + ";"
                    + "UPDATE evaluation "
                    + "SET evaluation_finalised = 1 "
                    + "WHERE evaluation_id = " + evaluation_id; 
            sqlAdapter.sqlCall(sql_updatecsv, function (updatecsvRes) {
                if (updatecsvRes == null) {
                    res.send(UNSUCCESSFUL);
                    return;
                }
                res.send(cleanRes);
            });
        });
    }
});

router.get('/download', function (req, res, next) {
    if(req.query.report_id != null)
    {
        // Example: http://localhost:3001/report/download?report_id=1

        const sql = "SELECT report_csv "
            + "FROM report "
            + "WHERE report_id = " + req.query.report_id;

        sqlAdapter.sqlCall(sql, function (downloadRes) 
        {
            if (downloadRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            let report_csv = downloadRes[0].report_csv;
            //Set the response header
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream', // Tell the browser this is a binary file 
                'Content-Disposition': 'attachment; filename=' + encodeURI(report_csv), // Tell the browser that this is a file to download
            });
            var readStream = fs.createReadStream(report_csv); // Get file input stream
            debugger
            readStream.on('data', (chunk) => {
                res.write(chunk, 'binary'); // The content of the document is written to the response output stream in binary format
            });
            readStream.on('end', () => {
                res.end();
            })
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