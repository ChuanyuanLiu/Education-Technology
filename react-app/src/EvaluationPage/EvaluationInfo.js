import React from "react";
import "./EvaluationPage.css";
import {CheckOutlined, UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper";
import {EvaluationInfoData} from "../Utils/DataClass";
import InfoCard from "../Utils/InfoCard";

/**
 * Route from evaluationPage
 * Route to EvaluationOverviewPage
 * @param {EvaluationInfoData} data
 * @param {function} handleClick(data.id)
 */
function EvaluationInfo({data, onClick}) {
    if (!(data instanceof EvaluationInfoData)) {
        console.error(
            "EvaluationInfo requires EvaluationInfoData as the first argument"
        );
    }

    return (
        <InfoCard title={data.title()} onClick={()=>onClick(data.id())}>
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
