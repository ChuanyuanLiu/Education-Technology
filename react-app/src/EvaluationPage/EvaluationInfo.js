import React from "react";
import "./EvaluationPage.css";
import { useHistory } from "react-router-dom";
import {CheckOutlined, UserOutlined} from '@ant-design/icons'

function EvaluationInfo (props){
    const history = useHistory();
    function handleClick(){
        history.push('/evaluation_overview')
    }
    function resolveTime(time){
        var splittedTime = time.split("-")
        var year = splittedTime[0]
        var month = splittedTime[1]
        var day = splittedTime[2].split('T')[0]
        return year + '/'+ month + '/' + day
    }
    return (
        <div className="evaluationInfo" 
            onClick = {handleClick}>          
            <div className="evaluationTitle">{props.item.evaluation_title}</div>
            <div className="evaluationStatus">
                {props.item.evaluation_completed? <CheckOutlined /> : null}
            {props.item.evaluation_completed? "Completed": "Active"}</div>
            <div className="author"><UserOutlined style={{fontSize: "20px"}}/>  {props.item.evaluation_author}</div>
            <div>
                <div className="framework">
                    {props.item.framework_title}
                </div>
                <div className="date">
                    {resolveTime(props.item.evaluation_modified_time)}
                </div>
            </div>
        </div>
    )

}
export default EvaluationInfo