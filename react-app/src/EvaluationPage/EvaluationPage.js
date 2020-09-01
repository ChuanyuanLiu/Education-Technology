import React from "react";
import "./Evaluation.css"
import NavBar from "../Utils/NavBar"
import SearchBar from "../Utils/SearchBar"
import evaluationData from "./evaluationData"
import EvaluationInfo from "./EvaluationInfo";

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


        </div>
    )}
}

export default EvaluationPage;