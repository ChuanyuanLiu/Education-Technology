import React from "react";
import "./EvaluationPage.css";
import {useHistory} from "react-router-dom";
import {CheckOutlined, UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper";
import {EvaluationInfoData} from "../Utils/DataClass";
import InfoCard from "../Utils/InfoCard";

/**
 * Route from evaluationPage
 * Route to EvaluationOverviewPage
 * @param {EvaluationInfoData} data
 */
function EvaluationInfo({data}) {
    if (!(data instanceof EvaluationInfoData)) {
        console.error(
            "EvaluationInfo requires EvaluationInfoData as the first argument"
        );
    }
    const history = useHistory();
    // This function takes in evaluation_id and returns  a function
    // that can point to a specific evaluation
    const handleClick = () => {
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id: data.id(),
                framework_id: data.frameworkId(),
            },
        });
    };
    return (
        <InfoCard title={data.title()} onClick={handleClick}>
            <div className='leftContent'>
                <UserOutlined style={{fontSize: "20px"}} />
                {data.author()}
                <br/>
                Based on framework: {data.frameworkTitle()}
            </div>
            <div className='rightContent'>
                {data.wasCompleted() ? <CheckOutlined /> : null}
                {data.wasCompleted() ? "Completed" : "Active"}
                <br/>
                Last modified: &nbsp;
                {resolveTime(data.modifiedTime())}
            </div>
        </InfoCard>
    );
}
export default EvaluationInfo;
