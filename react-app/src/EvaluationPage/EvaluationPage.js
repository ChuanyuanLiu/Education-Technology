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
    const history = useHistory();
    const [evaluationList, setEvaluationList] = useState(null);

    const AUTH_ROLE = "Senior Consultant"
    const CONSULTANT = "Consultant"
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
    }, []);

    const goToEvaluationOverivew = (id) => {
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id: id,
                user: user.name,
                role: roles[0].name
            },
        });
    };

    const goToNewEvaluation = () => {
        history.push({
            pathname: "./new_evaluation",
            state: {
                user: user.name,
                role: roles[0].name
            },
        });
    };

    function convertToDataClass(data) {
        return data.map(data => new EvaluationInfoData(data));
    }

    if (evaluationList == null|| isLoading || rolesLoading)
        return <h1> Loading ... </h1>;
    
        

    // console.log(newList)
    // const useList = newList
    //Senior Consultant and consultant can access all evaluations
    const renderList = evaluationList.filter((data) => {
        if(data.author() === user.name || roles[0].name === AUTH_ROLE || roles[0].name === CONSULTANT){
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
