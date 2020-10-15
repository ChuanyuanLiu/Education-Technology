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

function ReportOverview ({history}){
    const [reportData, setReport] = useState(null)
    const {report_id} = history.location.state

    const post_title_url = `http://localhost:3001/report/update/title?report_id=${report_id}`
    const post_summary_url = `http://localhost:3001/report/update/recommendation?report_id=${report_id}`
    const post_finailized_url = `http://localhost:3001/report/finalise?report_id=${report_id}`
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
        console.log(url)
        fetch(url)
            .then((data) => data.text())
            .then((response) => {
                if (
                    response === "Successful!"
                ) {
                    setReport({...reportData, report_finalised: 1});
                }
            })
            .catch(console.err);

    }
    const handlePublish = () =>{
        console.log("publish")
    }
    const viewEvaluation = ()=>{
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id: reportData.evaluation_id,
            },
        });
    }
    console.log(reportData)
    return (
        <div className='flex_container '>
            <NavBar>
                <div className="middle">
                    <TextInput
                        text={reportData.report_title}
                        title={"Report Title"}
                        onSave={post_title_request(post_title_url)}
                        disabled={reportData.report_finalised}
                    />
                </div>
            </NavBar>
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
                        disabled={reportData.report_finalised}
                    />
                </div>

                <div className='footer'>
                {!reportData.report_finalised?               
                    <BigButton
                        onClick={post_finailized_request(post_finailized_url)}
                    >
                        Finalize
                    </BigButton>
                    :
                    <BigButton
                    onClick={handlePublish}
                    >
                        Publish
                    </BigButton>
                }
                </div>
            </div>
        </div>
    )
}

export default ReportOverview;