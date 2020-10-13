import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton";
import {EvaluationInfoData} from "../Utils/DataClass.js";
import CardList from "../Utils/CardList";


/**
 * Route from Homepage
 * Evaluation Page /evaluation
 *  |-- NavBar
 *      |-- SearchBar
 *  |-- EvaluationList
 *  |-- BigButton (route to /new_evaluation)
 */
function EvaluationPage() {
    const SEARCH_PROPERTY = "title";
    const SORTBY_PROPERTY = "modifiedTime";
    const history = useHistory();
    const [evaluationList, setEvaluationList] = useState(null);



    // initalize data
    useEffect(() => {
        fetch("http://localhost:3001/evaluation")
            .then((response) => response.json())
            .then((data) => {
                setEvaluationList(convertToDataClass(data));
            })
            .catch(console.error);
    }, []);

    const goToEvaluationOverivew = (id) => {
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id: id,
            },
        });
    };

    const goToNewEvaluation = () => history.push("./new_evaluation");

    function convertToDataClass(data) {
        return data.map(data=>new EvaluationInfoData(data));
    }

    if (evaluationList == null )
        return <h1> Loading ... </h1>;

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Evaluations
                </NavBar>
            </div>
            <div className='content scrollable'>
                <CardList 
                    searchProperty={SEARCH_PROPERTY} 
                    sortByProperty={SORTBY_PROPERTY}
                    list={evaluationList}
                    CardReactComponent={EvaluationInfo}
                    dataClass={EvaluationInfoData}
                    onClick={goToEvaluationOverivew}
                />
            </div>
            <div className='footer'>
                <BigButton onClick={goToNewEvaluation}>
                    New Evaluation
                </BigButton>
            </div>
        </div>
    );
}


export default EvaluationPage;
