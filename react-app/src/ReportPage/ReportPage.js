import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import NavBar from "../Utils/NavBar";
import ReportInfo from "./ReportInfo";
import BigButton from "./../Utils/BigButton";
import {ReportInfoData} from "../Utils/DataClass.js";
import CardList from "../Utils/CardList";
import { useAuth0 } from '@auth0/auth0-react';
import { useRole } from "../Utils/UseRole";
import { useMetadata } from "../Utils/UseMetadata";
import Reminder from "../Utils/Reminder";

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

    const AUTH_ROLE = "Senior Consultant"
    const CONSULTANT = "Consultant"
    const GUEST = "Educational Leader"
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { error, roles, loading: rolesLoading} = useRole();
    const { error: metadataError, metadata, loading: metadataLoading } = useMetadata();

    // initalize data by getting the data and wrap response in DataClass
    useEffect(() => {
        fetch("https://localhost:3001/report")
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

    if (reportList == null || isLoading || rolesLoading || metadataLoading)
        return <h1> Loading ... </h1>;

    const renderList = reportList.filter((data) => {
        if(data.author() === user.name || roles[0].name === AUTH_ROLE ){
            return data
        }
    })
    const has_permission =  roles[0].name !== GUEST|| metadata.create_report
    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Reports
                </NavBar>
            </div>
            <div className='content scrollable'>
            {!has_permission &&                         
                <Reminder is_hidden={true}>
                    <span>
                        You don't have permission for creating report. Please contact Adminstrator to gain the authority.
                    </span>
                </Reminder>}
                <CardList 
                    searchProperty={SEARCH_PROPERTY} 
                    sortByProperty={SORTBY_PROPERTY}
                    list={renderList}
                    CardReactComponent={ReportInfo}
                    dataClass={ReportInfoData}
                    onClick={goToReportOverview}
                />
            </div>
            <div className='footer'>
                {
                    (has_permission) &&
                    <BigButton onClick={goToEvaluationSelection}>
                        New Report
                    </BigButton>
                }
            </div>
        </div>
    );
}


export default ReportPage;
