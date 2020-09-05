import React from "react";
import "./EvaluationPage.css"
import NavBar from "../Utils/NavBar"
import SearchBar from "../Utils/SearchBar"
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton"

class EvaluationPage extends React.Component{
    constructor(){
        super()
        this.state = {
            evaluationInfos: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        fetch("http://localhost:3001/evaluation")
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {evaluationInfos: data}
                )
            })
    }

    handleClick(){
        alert('hello')
        this.props.history.push('/new_evaluation')
    }
    render (){
        const evaluationlist = this.state.evaluationInfos.map(data =>
            <EvaluationInfo key={data.evaluation_id} item={data} />)
        return (
        <div>
            <NavBar title = 'Evaluation' />
            <SearchBar />
            <div>{evaluationlist}</div>
            <br /><br /><br /><br /><br /><br />
            <div className="buttomButton" 
                onClick={this.handleClick} >            
                <BigButton name="New Evaluation"
                           type="direct"
                           
                />
            </div>

        </div>
    )}
}

export default EvaluationPage;