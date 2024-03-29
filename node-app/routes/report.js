/**
 * This project is used for University of Melbourne Masters Software Engineering Project (SWEN90014_2020_SM2)
 * @description This file is used to process all the back-end logic related to the report business function
 * @author EdTech Evaluation-Budgerigar Team
 * @date 2020/10/25
 */

// Import the required modules
var express = require('express');
var router = express.Router();
const fs = require('fs');
var sd = require('silly-datetime');
var nodemailer = require('nodemailer');
var sqlAdapter = require('../dataSource/sqlAdapter');
const { response } = require('express');

// Define SqlCall execution result statements 
const UNSUCCESSFUL = "The call to the SQL database was unsuccessful.";
const SUCCESSFUL = "The call to the SQL database was successful."

/**
 * @description APIs for report listing logic
 *              If SqlCall excutes successfully, send the corresponding result. If not, send UNSUCCESSFUL
 * @param {any} req - ReqBody
 * @param {any} res - ResBody
 * @param {any} next - ResQuery
 */
router.get('/', function (req, res, next) {

    /**
    * @api: GET /report?report_id={rid}
    * @description API for returning all information of a report
    * @example https://localhost:3001/report?report_id=1
    * @param {number} req.query.report_id - report_id
    */
    if (req.query.report_id != null) {
        const sql = "SELECT r.*, e.evaluation_title "
            + "FROM report r, evaluation e "
            + "WHERE r.report_id = " + req.query.report_id + " AND r.evaluation_id = e.evaluation_id";

        sqlAdapter.sqlCall(sql, function (reportRes) {
            if (reportRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(reportRes[0]);
        });

    }

    /**
    * @api: GET /report
    * @description API for returning a list of all reports
    * @example https://localhost:3001/report
    */
    else {
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

/**
* @description API for generating a new report
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
*/
router.get('/new', function (req, res, next) {
    /**
    * @api: GET /report/new?evaluation_id={eid}&author_name={author_name}
    * @description API for selecting a completed evaluation to generate a report, and return all data about the newly created report.
    * @example https://localhost:3001/report/new?evaluation_id=1&author_name=Tony
    * @param {number} req.query.evaluation_id - evaluation_id
    * @param {number} req.query.author_name - author_name
    */
    if (req.query.evaluation_id != null && req.query.author_name != null) {
        // Excute 3 SQL statements:
        // 1. Create a new report, Insert a new evaluation_id
        const sql = "INSERT INTO report ( evaluation_id, report_author ) VALUES ( " + req.query.evaluation_id + ", '" + req.query.author_name + "' );"
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

    /**
    * @api: GET /report/new
    * @description API for returning all completed evaluations
    * @example https://localhost:3001/report/new
    */
    else {
        const sql = "SELECT e.*, f.framework_title "
            + "FROM evaluation e, framework f "
            + "WHERE e.evaluation_finalised = 1 AND e.framework_id = f.framework_id";
        sqlAdapter.sqlCall(sql, function (evaluationRes) {
            if (evaluationRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            res.send(evaluationRes);
        });
    }
});

/**
* @description API for finalising a report
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
*/
router.get('/finalise', function (req, res, next) {
    /**
    * @api: GET /report/finalise?report_id={rid}
    * @description API for finalising a report
    * @example https://localhost:3001/report/finalise?report_id=1
    * @param {number} req.query.report_id - report_id
    */
    if (req.query.report_id != null) {
        let report_id = req.query.report_id;
        //1. Returns report, evaluation, framework details
        const sql = "SELECT r.*, e.evaluation_id, e.evaluation_title, "
            + "f.framework_id, f.framework_title "
            + "FROM report AS r INNER JOIN evaluation AS e USING (evaluation_id) "
            + "INNER JOIN framework AS f USING (framework_id) "
            + "WHERE report_id = " + report_id + ";"

        sqlAdapter.sqlCall(sql, function (reportRes) {
            if (reportRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            let section_indexforsection = 1;
            let section_indexforquestion = 1;
            let question_index = 1;
            let last_section_index = 1;

            let report_id = reportRes[0].report_id;
            let report_author = reportRes[0].report_author;
            let report_title = reportRes[0].report_title;
            let report_creation_time = reportRes[0].report_creation_time;
            let report_modified_time = reportRes[0].report_modified_time;
            let report_recommendation = reportRes[0].report_recommendation;
            let evaluation_id = reportRes[0].evaluation_id;
            let evaluation_title = reportRes[0].evaluation_title;
            let framework_id = reportRes[0].framework_id;
            let framework_title = reportRes[0].framework_title;

            var csvContent = report_title + ' ';
            csvContent += 'by ';
            csvContent += report_author + ' ';
            csvContent += 'created on ';
            csvContent += report_creation_time + ' ';
            csvContent += 'last modified on ';
            csvContent += report_modified_time + '\n';

            csvContent += 'Report recommendation: ';
            csvContent += '"' + report_recommendation + '"\n';

            csvContent += 'Based on evaluation '
            csvContent += '"' + evaluation_title + '"\n';

            csvContent += 'Based on framework '
            csvContent += '"' + framework_title + '"\n'

            csvContent += 'section_index,';
            csvContent += 'section_title\n';

            //2. Returns min section_id and max section_id 
            const sql2 = "SELECT MIN(section_id) AS min_section_id, MAX(section_id) AS max_section_id "
                + "FROM framework_section WHERE framework_id = " + framework_id;

            sqlAdapter.sqlCall(sql2, function (sectionRes) {
                if (sectionRes == null) {
                    res.send(UNSUCCESSFUL);
                }

                let min_section_id = sectionRes[0].min_section_id;
                let max_section_id = sectionRes[0].max_section_id;

                last_section_index = sectionRes[0].min_section_id;

                for (let i = min_section_id; i <= max_section_id; i++) {
                    //3.0. Returns section details
                    //3.1. Returns min question_id and max question_id 
                    const sql3 = "SELECT section_id, section_title "
                        + "FROM framework_section WHERE section_id = " + i + ";"
                        + "SELECT MIN(question_id) AS min_question_id, MAX(question_id) AS max_question_id "
                        + "FROM framework_section_question WHERE section_id = " + i;

                    sqlAdapter.sqlCall(sql3, function (question1Res) {
                        if (question1Res == null) {
                            res.send(UNSUCCESSFUL);
                        }
                        let section_id = section_indexforsection;
                        let section_title = question1Res[0][0].section_title;

                        csvContent += section_id + ',';
                        csvContent += '"' + section_title + '"\n';

                        section_indexforsection++;

                        let min_question_id = question1Res[1][0].min_question_id;
                        let max_question_id = question1Res[1][0].max_question_id;

                        if (i == max_section_id) {
                            csvContent += 'section_index,';
                            csvContent += 'question_index,';
                            csvContent += 'question_title,';
                            csvContent += 'rate_1_criterion,';
                            csvContent += 'rate_2_criterion,';
                            csvContent += 'rate_3_criterion,';
                            csvContent += 'rate_4_criterion,';
                            csvContent += 'rate_5_criterion,';

                            csvContent += 'rate_chosen,';
                            csvContent += 'response_comment\n';
                        }

                        for (let i = min_question_id; i <= max_question_id; i++) {
                            //4. Return question details 
                            const sql4 = "SELECT question_id, section_id, question_title, rate_1_criterion, rate_2_criterion, "
                                + "rate_3_criterion, rate_4_criterion, rate_5_criterion "
                                + "FROM framework_section_question "
                                + "WHERE question_id = " + i + ";"
                                + "SELECT question_id, rate_chosen, response_comment "
                                + "FROM evaluation_response WHERE question_id = " + i;

                            sqlAdapter.sqlCall(sql4, function (responseRes) {
                                if (responseRes == null) {
                                    res.send(UNSUCCESSFUL);
                                }


                                if (last_section_index != responseRes[0][0].section_id) {
                                    section_indexforquestion++;
                                    last_section_index = responseRes[0][0].section_id;
                                }

                                let question_id = question_index;
                                let section_id = section_indexforquestion;
                                let question_title = responseRes[0][0].question_title;
                                let rate_1_criterion = responseRes[0][0].rate_1_criterion;
                                let rate_2_criterion = responseRes[0][0].rate_2_criterion;
                                let rate_3_criterion = responseRes[0][0].rate_3_criterion;
                                let rate_4_criterion = responseRes[0][0].rate_4_criterion;
                                let rate_5_criterion = responseRes[0][0].rate_5_criterion;

                                let response_comment = responseRes[1][0].response_comment;
                                let rate_chosen = responseRes[1][0].rate_chosen;

                                csvContent += section_id + ',';

                                csvContent += '"' + question_id + '",';
                                csvContent += '"' + question_title + '",';
                                csvContent += '"' + rate_1_criterion + '",';
                                csvContent += '"' + rate_2_criterion + '",';
                                csvContent += '"' + rate_3_criterion + '",';
                                csvContent += '"' + rate_4_criterion + '",';
                                csvContent += '"' + rate_5_criterion + '",';
                                csvContent += rate_chosen + ',';
                                csvContent += '"' + response_comment + '"\n';

                                question_index++;

                                // The .csv file is stored in '$REPORTS_FILEPATH'
                                // Current filepath of .csv file is './reports/report_title.csv'
                                const REPORTS_DIR = './reports';
                                const REPORTS_FILEPATH = REPORTS_DIR + '/' + report_title + '.csv';

                                // Generate the directory
                                fs.mkdir(REPORTS_DIR, (err) => {
                                })

                                // Generate the .csv file
                                fs.writeFile(REPORTS_FILEPATH, csvContent, function (err) {
                                    if (err) {
                                        console.log(err, '--->csv generation failed<---')
                                    }
                                })

                                // If file generated successfully, save the filepath in 'report_csv' field.
                                // And set 'report_finalised' = 1
                                const sql_updatecsv = "UPDATE report "
                                    + "SET report_csv = '" + REPORTS_FILEPATH + "' "
                                    + "WHERE report_id = " + report_id + ";"
                                    + "UPDATE report "
                                    + "SET report_finalised = 1 "
                                    + "WHERE report_id = " + report_id;

                                sqlAdapter.sqlCall(sql_updatecsv, function (updatecsvRes) {
                                    if (updatecsvRes == null) {
                                        res.send(UNSUCCESSFUL);
                                        return;
                                    }
                                });
                            });
                        }
                    });

                }
            });
        });

        res.send(SUCCESSFUL);
    }
});

/**
* @description API for downloading the report.
* @param {number} req.query.report_id - report_id
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
*/
router.get('/download', function (req, res, next) {
    /**
    * @api: GET /report/download?report_id={rid}
    * @description API for downloading the report.
    * @example https://localhost:3001/report/download?report_id=1
    * @param {number} req.query.report_id - report_id
    */
    if (req.query.report_id != null) {
        const sql = "SELECT report_csv "
            + "FROM report "
            + "WHERE report_id = " + req.query.report_id;

        sqlAdapter.sqlCall(sql, function (downloadRes) {
            if (downloadRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }

            let report_csv = downloadRes[0].report_csv;
            //Set the response header
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream', // Tell the browser this is a binary file 
                'Content-Disposition': 'attachment; filename=' + encodeURI(report_csv.substring(10)), // Tell the browser that this is a file to download
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

/**
* @description API for sending the csv file to an email.
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
*/
router.get('/sendemail', function (req, res, next) {
    /**
    * @api: GET /report/sendemail?emailaddress={emailaddress}&report_id={rid}
    * @description API for sending the csv file to an email.
    * Node: If you want to add multiple email addresses, just add '&emailaddress=xxx@gmail.com' in the url.
    * For example: 2 email addresses:
    * https://localhost:3001/report/sendemail?emailaddress={emailaddress}&emailaddress={emailaddress}&report_id={rid}
    * @example https://localhost:3001/report/sendemail?emailaddress=xxx@gmail.com&report_id=1
    * @param {number} req.query.report_id - report_id
    * @param {string} req.query.emailaddress - emailaddress
    */
    if (req.query.emailaddress != null && req.query.report_id != null) {
        let emailaddress = req.query.emailaddress;
        let emailaddresscount;
        // emailaddress[0].indexOf("@") != -1 means that there are many email addresses
        if (emailaddress[0].indexOf("@") != -1) {
            emailaddresscount = emailaddress.length;
        }
        // emailaddress[0].indexOf("@") == -1 means that there are only 1 email addresses
        else {
            emailaddresscount = 1;
        }
        let report_id = req.query.report_id;

        // The configuration of Email used
        var mailTransport = nodemailer.createTransport({
            service: 'Gmail',
            secureConnection: true, // Use SSL to login
            auth: {
                user: 'edtechofficial@gmail.com',
                pass: 'edtech2020'
            },
        });
        const sql = "SELECT report_csv, report_title "
            + "FROM report "
            + "WHERE report_id = " + report_id;
        sqlAdapter.sqlCall(sql, function (sendEmailRes) {
            if (sendEmailRes == null) {
                res.send(UNSUCCESSFUL);
                return;
            }
            let report_csv = sendEmailRes[0].report_csv;
            let report_title = sendEmailRes[0].report_title;

            for (let i = 0; i < emailaddresscount; i++) {
                // Only 1 email address
                if (emailaddresscount == 1) {
                    var options = {
                        from: '"EdTech" <edtechofficial@gmail.com>',
                        to: emailaddress.split("@", 1) + ' <' + emailaddress + '>',
                        // cc         : ''  
                        // bcc      : ''    
                        subject: 'Edtech-report',
                        text: 'Edtech-report',
                        // html           : '<h1>Hello! This is a Email from EdTech</h1>',
                        attachments:
                            [
                                {
                                    filename: report_title + '.csv', // Attachment name
                                    path: report_csv, // Attachment file path
                                    cid: '00000001' // Can be used by email      
                                }
                            ]
                    };
                }
                // Many email addresses
                else {
                    var options = {
                        from: '"EdTech" <edtechofficial@gmail.com>',
                        to: emailaddress[i].split("@", 1) + ' <' + emailaddress[i] + '>',
                        // cc         : ''  
                        // bcc      : ''    
                        subject: 'Edtech-report',
                        text: 'Edtech-report',
                        // html           : '<h1>Hello! This is a Email from EdTech</h1>',
                        attachments:
                            [
                                {
                                    filename: report_title + '.csv', // Attachment name
                                    path: report_csv, // Attachment file path
                                    cid: '00000001' // Can be used by email      
                                }
                            ]
                    };
                }
                mailTransport.sendMail(options, function (err, msg) {
                    if (err) {
                        console.log(err);
                        res.send(UNSUCCESSFUL);
                        res.render('index', { title: err });
                    }
                    else {
                        console.log(msg);
                        res.send(SUCCESSFUL);
                        res.render('index', { title: "Received：" + msg.accepted });
                    }
                });
            }
        });
    }
});

/**
* @api: POST /report/update/title?report_id={rid}
* @description API for updating the title of a report
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
* @param {number} req.query.report_id - report_id
* @param {string} req.body.report_title - report_title
*/
router.post('/update/title', function (req, res, next) {

    let report_title = req.body.report_title;
    let report_id = req.query.report_id;
    report_title = report_title.replace(/'/g, "\\'");
    report_title = report_title.replace(/"/g, "\\\"");
    const sql = "UPDATE report "
        + "SET report_title = '" + report_title
        + "' WHERE report_id = " + report_id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null || JSON.stringify(updateRes) == '[]') {
            res.send(UNSUCCESSFUL);
            return;
        }

        res.send(SUCCESSFUL);
    });
});

/**
* @api: POST /report/update/recommendation?report_id={rid}
* @description API for updating the recommendation of the report
* @param {any} req - ReqBody
* @param {any} res - ResBody
* @param {any} next - ResQuery
* @param {number} req.body.report_recommendation - report_recommendation
* @param {string} req.query.report_id - report_id
*/
router.post('/update/recommendation', function (req, res, next) {

    let report_recommendation = req.body.report_recommendation;
    let report_id = req.query.report_id;
    report_recommendation = report_recommendation.replace(/'/g, "\\'");
    report_recommendation = report_recommendation.replace(/"/g, "\\\"");

    const sql = "UPDATE report "
        + "SET report_recommendation = '" + report_recommendation
        + "' WHERE report_id = " + report_id;

    sqlAdapter.sqlCall(sql, function (updateRes) {
        if (updateRes == null || JSON.stringify(updateRes) == '[]') {
            res.send(UNSUCCESSFUL);
            return;
        }

        res.send(SUCCESSFUL);
    });
});

module.exports = router;