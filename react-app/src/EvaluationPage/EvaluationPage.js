import React from "react";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import SearchBar from "../Utils/SearchBar";
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton";

class EvaluationPage extends React.Component {
    constructor() {
        super();
        this.state = {
            evaluationInfos: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/evaluation")
            .then((response) => response.json())
            .then((data) => {
                this.setState({evaluationInfos: data});
            });
    }

    handleClick() {
        this.props.history.push("/new_evaluation");
    }
    render() {
        const evaluationlist = this.state.evaluationInfos.map((data) => (
            <EvaluationInfo key={data.evaluation_id} item={data} />
        ));
        return (
            <div className='flex_container'>
                <div className='header'>
                    <NavBar>
                        Evaluations
                        <SearchBar />
                    </NavBar>
                </div>
                <div className='content scrollable element_container'>
                    {evaluationlist} 
                </div>
                <div className='footer'>
                    <BigButton onClick={this.handleClick}>
                        New Evaluation
                    </BigButton>
                </div>
            </div>
        );
    }
}

export default EvaluationPage;
