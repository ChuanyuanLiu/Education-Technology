import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import EvaluationInfo from "./EvaluationInfo";
import BigButton from "./../Utils/BigButton";
import {EvaluationInfoData} from "../Utils/DataClass.js";
import CardList from "../Utils/CardList";
import { useAuth0 } from '@auth0/auth0-react';
import { useRole } from "../Utils/UseRole";


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
    const AUTH_ROLE = "Senior Consultant"
    const history = useHistory();
    const [evaluationList, setEvaluationList] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { error, roles, loading: rolesLoading, refresh } = useRole();



    // initalize data
    useEffect(() => {
        fetch("http://localhost:3001/evaluation")
            .then((response) => response.json())
            .then((data) => {
                setEvaluationList(convertToDataClass(data));
            })
            .catch(console.error);
    }, [evaluationList]);

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
        return data.map(data => new EvaluationInfoData(data));
    }

    if (evaluationList == null|| isLoading || rolesLoading)
        return <h1> Loading ... </h1>;
    
        

    // console.log(newList)
    // const useList = newList

    const renderList = evaluationList.filter((data) => {
        if(data.author() === user.name || roles[0].name === "Senior Consultant"){
            return data
        }
    })
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
                    list={renderList}
                    CardReactComponent={EvaluationInfo}
                    dataClass={EvaluationInfoData}
                    onClick={goToEvaluationOverivew}
                    role={roles[0].name}
                    user={user.name}
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
