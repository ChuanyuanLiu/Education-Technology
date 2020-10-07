import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import SearchBar, {sentence_contains} from "../Utils/SearchBar";
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton";
import {EvaluationInfoData} from "../Utils/DataClass.js";

/**
 * Route from Homepage
 * Evaluation Page /evaluation
 *  |-- NavBar
 *      |-- SearchBar
 *  |-- EvaluationList
 *  |-- BigButton (route to /new_evaluation)
 */
function EvaluationPage() {
    const SEARCH_FIELD = "evaluation_title";
    const history = useHistory();
    const [evaluationListAll, setEvaluationListAll] = useState(null);
    const [evaluationList, setEvaluationList] = useState(null);

    // initalize data
    useEffect(() => {
        fetch("http://localhost:3001/evaluation")
            .then((response) => response.json())
            .then((data) => {
                setEvaluationListAll(data);
                setEvaluationList(data);
            })
            .catch(console.error);
    }, []);

    if (evaluationList == null || evaluationList == null)
        return <h1> Loading ... </h1>;

    const goToNewEvaluation = () => history.push("./new_evaluation");

    const filterEvaluationList = (text) => {
        setEvaluationList(
            evaluationListAll.filter((evaluation) =>
                sentence_contains(evaluation[SEARCH_FIELD], text)
            )
        );
    };

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Evaluations
                    <SearchBar onSearch={filterEvaluationList} />
                </NavBar>
            </div>
            <div className='content scrollable'>
                <EvaluationList list={evaluationList} />
            </div>
            <div className='footer'>
                <BigButton onClick={goToNewEvaluation}>
                    New Evaluation
                </BigButton>
            </div>
        </div>
    );
}

function EvaluationList({list}) {
    return (
        <div className='EvaluationList'>
            {list.map((data, i) => (
                <EvaluationInfo key={i} data={new EvaluationInfoData(data)} />
            ))}
        </div>
    );
}

export default EvaluationPage;
