import React from "react";
import "./EvaluationPage.css"
import NavBar from "../Utils/NavBar"
import SearchBar from "../Utils/SearchBar"
import evaluationData from "./evaluationData"
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton"

class EvaluationPage extends React.Component{
    constructor(){
        super()
        this.state = {
            evaluationInfos: evaluationData
        }
    }
    render (){
        const evaluationlist = this.state.evaluationInfos.map(data =>
            <EvaluationInfo key={data.id} item={data} />)
        return (
        <div>
            <NavBar title = 'Evaluation' />
            <SearchBar />
            <div>{evaluationlist}</div>
            <br /><br /><br /><br /><br /><br />
            <div className="buttomButton"  >            
                <BigButton name="New Evaluation"
                           type="direct"
                />
            </div>

        </div>
    )}
}

export default EvaluationPage;