import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import NavBar from "../Utils/NavBar";
import ReportInfo from "./ReportInfo";
import BigButton from "./../Utils/BigButton";
import {ReportInfoData} from "../Utils/DataClass.js";
import CardList from "../Utils/CardList";

/**
 * Route from Homepage
 * Report Page /report
 *  |-- NavBar
 *      |-- SearchBar
 *  |-- ReportList
 *  |-- BigButton (create a new report)
 */
function ReportPage() {
    const SEARCH_PROPERTY = "title";
    const SORTBY_PROPERTY = "modifiedTime";
    const history = useHistory();
    const [reportList, setReportList] = useState(null);

    // initalize data by getting the data and wrap response in DataClass
    useEffect(() => {
        fetch("http://localhost:3001/report")
            .then((response) => response.json())
            .then((data) => {
                setReportList(convertToDataClass(data));
            })
            .catch(console.error);
    }, []);

    function convertToDataClass(data) {
        return data.map(element=>new ReportInfoData(element));
    }

    function goToReportOverview(id) {
        history.push({
            pathname: "/report_overview",
            state: {
                report_id: id,
            },
        });
    };

    async function goToEvaluationSelection() {
        history.push({
            pathname: "/new_report",
        });
    }

    if (reportList == null )
        return <h1> Loading ... </h1>;

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Reports
                </NavBar>
            </div>
            <div className='content scrollable'>
                <CardList 
                    searchProperty={SEARCH_PROPERTY} 
                    sortByProperty={SORTBY_PROPERTY}
                    list={reportList}
                    CardReactComponent={ReportInfo}
                    dataClass={ReportInfoData}
                    onClick={goToReportOverview}
                />
            </div>
            <div className='footer'>
                <BigButton onClick={goToEvaluationSelection}>
                    New Report
                </BigButton>
            </div>
        </div>
    );
}


export default ReportPage;
