import React from "react";
import "./EvaluationPage.css";
import { useHistory } from "react-router-dom";

function EvaluationInfo (props){
    const history = useHistory();
    function handleClick(){
        history.push('/evaluation_overview')
    }
    return (
        <div className="evaluationInfo" 
            onClick = {handleClick}>
            <p>{props.item.author}</p>
            <p>{props.item.framework}</p>
            <p>{props.item.date}</p>
            <p>{props.item.status}</p>
        </div>
    )

}
export default EvaluationInfo