import React from "react";
import "./Evaluation.css"

function EvaluationInfo (props){

    return (
        <div className="evaluationInfo">
            <p>{props.item.author}</p>
            <p>{props.item.framework}</p>
            <p>{props.item.date}</p>
            <p>{props.item.status}</p>
        </div>
    )

}

export default EvaluationInfo