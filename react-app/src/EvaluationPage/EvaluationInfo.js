import React from "react";
import "./EvaluationPage.css";
import { useHistory } from "react-router-dom";
import {CheckOutlined, UserOutlined} from '@ant-design/icons'

function EvaluationInfo (props){
    const history = useHistory();
    function handleClick(){
        history.push('/evaluation_overview')
    }
    return (
        <div className="evaluationInfo" 
            onClick = {handleClick}>          
            <div className="evaluationTitle">{props.item.title}</div>
            <div className="evaluationStatus">
                {props.item.status === "completed"? <CheckOutlined /> : null}
            {props.item.status}</div>
            <div className="author"><UserOutlined style={{fontSize: "20px"}}/>  {props.item.author}</div>
            <div>
                <div className="framework">
                    {props.item.framework}
                </div>
                <div className="date">
                    {props.item.date}
                </div>
            </div>
        </div>
    )

}
export default EvaluationInfo