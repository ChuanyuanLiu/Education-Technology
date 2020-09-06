import React from "react"
import "./EvaluationPage.css"

function QuestionContainer(props){
    return (
        <div className="question">
            <label>
                <input 
                    type="radio"
                    name="choice"
                    value="1"
                    checked={props.choice === "1"}
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
                    value="2"
                    checked={props.choice === "2"}
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
                    value="3"
                    checked={props.choice === "3"}
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
                    value="4"
                    checked={props.choice === "4"}
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
                    value="5"
                    checked={props.choice === "5"}
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