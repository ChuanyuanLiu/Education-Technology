import React from "react"
import "./EvaluationPage.css"

function QuestionContainer(props){
    return (
        <div className="question">
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="notApplicable"
                    checked={props.choice === "notApplicable"}
                    onChange={props.handleChange}
                /> Not Applicable
                <div className="rateCriteria">
                    {props.data.notApplicable}
                </div> 
            </label>
            <br />
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="belowBasic"
                    checked={props.choice === "belowBasic"}
                    onChange={props.handleChange}
                /> Below Basic
                <div className="rateCriteria">
                    {props.data.belowBasic}
                </div> 
            </label>
            <br />
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="basic"
                    checked={props.choice === "basic"}
                    onChange={props.handleChange}
                /> Basic
                <div className="rateCriteria"> 
                    {props.data.basic}
                </div> 
            </label>
            <br />
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="adequate"
                    checked={props.choice === "adequate"}
                    onChange={props.handleChange}
                /> Adequate
                <div className="rateCriteria">
                    {props.data.adequate}
                </div> 
            </label>
            <br />
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="exceptional"
                    checked={props.choice === "exceptional"}
                    onChange={props.handleChange}
                /> Exceptional
                <div className="rateCriteria">
                    {props.data.exceptional}
                </div > 
            </label>
        </div>
        )
}

export default QuestionContainer