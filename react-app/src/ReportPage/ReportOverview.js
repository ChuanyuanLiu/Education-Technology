import React, {useEffect, useState} from "react"
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput";
import BigButton from "../Utils/BigButton";
import StatusSwitch from "../Utils/StatusSwitch";
import Reminder from "../Utils/Reminder";
import ReportInfo from "./ReportInfo";
import {ReportInfoData} from "../Utils/DataClass.js";
import TextArea from "../Utils/TextArea";
import "./ReportPage.css"
import { useMetadata } from "../Utils/UseMetadata";
import { useRole } from "../Utils/UseRole";

function ReportOverview ({history}){
    const [reportData, setReport] = useState(null)
    const {report_id} = history.location.state

    const GUEST = "Educational Leader"
    const { error: metadataError, metadata, loading: metadataLoading } = useMetadata();
    const { error, roles, loading: rolesLoading} = useRole();

    const post_title_url = `http://localhost:3001/report/update/title?report_id=${report_id}`
    const post_summary_url = `http://localhost:3001/report/update/recommendation?report_id=${report_id}`
    const post_finailized_url = `http://localhost:3001/report/finalise?report_id=${report_id}`
    const download_url = `http://localhost:3001/report/download?report_id=${report_id}`
    useEffect(() => 
        {
            let isCancelled = false;
            fetch(`http://localhost:3001/report?report_id=${report_id}`)
                .then((response) => response.json())
                .then((data) => {
                    if(!isCancelled){
                        setReport(data);
                    }
                })
                .catch(console.err);
            return () => {
                    isCancelled = true;
                };
        }, []);
    if(reportData === null) return <div>Loading</div>

    const post_title_request = (url) => (text) => {
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({report_title: text}),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((response) => {
                console.log(response)
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    setReport({...reportData, report_title: text});
                }
            })
            .catch(console.err);
    }
    const post_recommendation_request = (url) => (text) =>{
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ report_recommendation: text}),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((response) => {
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    setReport({...reportData, report_recommendation: text});
                }
            })
            .catch(console.err);

    }

    const post_finailized_request = (url) => {
        fetch(url)
            .then((data) => data.text())
            .then((response) => {
                console.log(response)
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    setReport({...reportData, report_finalised: 1});
                }
            })
            .catch(console.err);

    }

    const handlePublish = () =>{
        history.push({
            pathname: "/report_publish",
            state:{
                report_id: report_id,
                title: reportData.report_title
            }
        })
    }

    const viewEvaluation = ()=>{
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id: reportData.evaluation_id,
            },
        });
    }



    const handleDownload = () => {
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none'
        iframe.src = download_url
        iframe.onload = function () {
        document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    }; 

    if (reportData == null || rolesLoading || metadataLoading)
        return <h1> Loading ... </h1>;

    const has_permission =  roles[0].name !== GUEST|| metadata.create_report
    return (
        <div className='flex_container'>
            <NavBar>
                <div className="middle">
                    <TextInput
                        text={reportData.report_title}
                        title={"Report Title"}
                        onSave={post_title_request(post_title_url)}
                        disabled={reportData.report_finalised || !has_permission}
                    />
                </div>
            </NavBar>
            {!has_permission &&                         
                    <Reminder is_hidden={true}>
                        <span>
                            You don't have permission for creating report. Please contact Adminstrator to gain the authority.
                        </span>
                    </Reminder>}
            <ReportInfo data={new ReportInfoData(reportData)} hideTitle={true} onClick={()=>{}}/>
            <div className='content scrollable'>
                <div className='section_header'>Evaluation Used</div>
                <div className='evaluationBar'>
                    <span className="evaluation_title">{reportData.evaluation_title}</span>
                    <button className="viewButton" onClick={viewEvaluation}>View</button>
                </div>
                <div style={{display:"block"}}>
                    <TextArea
                        title='Recommendation'
                        text={reportData.report_recommendation}
                        onSave={post_recommendation_request(post_summary_url)}
                        disabled={reportData.report_finalised || !has_permission}
                    />
                </div>
            </div>
            <div className='footer'>
                    {has_permission &&
                    (!reportData.report_finalised?               
                        <BigButton
                            onClick={()=> post_finailized_request(post_finailized_url)}
                        >
                            Finalize
                        </BigButton>
                        :
                        (<span>
                            <BigButton
                                onClick={handleDownload}
                            >
                                Download
                            </BigButton>
                            <span> </span>
                            <BigButton
                                onClick={handlePublish}
                            >
                                Publish
                            </BigButton>
                        </span>)
                    )
                    }
                </div>
        </div>
    )
}

export default ReportOverview;