import React from "react";
import "./EvaluationPage.css";
import { useHistory } from "react-router-dom";
import {CheckOutlined, UserOutlined} from '@ant-design/icons'

function EvaluationInfo (props){
    const history = useHistory();
    // This function takes in evaluation_id and returns  a function
    // that can point to a specific evaluation
    const handleClick=({evaluation_id, framework_id})=>()=>{
        history.push({
            pathname: '/evaluation_overview',
            state : {
                evaluation_id,
                framework_id
            }
        })
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
            onClick = {handleClick(props.item)}>          
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