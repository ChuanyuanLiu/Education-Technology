import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import NavBar from "../Utils/NavBar";
import EvaluationInfo from "./EvaluationInfo";
import {EvaluationInfoData} from "../Utils/DataClass.js";
import CardList from "../Utils/CardList";
import {useAuth0} from "@auth0/auth0-react";

/**
 * Route from Homepage
 * Evaluation Page /evaluation
 *  |-- NavBar
 *      |-- SearchBar
 *  |-- EvaluationList
 *  |-- BigButton (route to /new_evaluation)
 */
function EvaluationSelection() {
    const SEARCH_PROPERTY = "title";
    const SORTBY_PROPERTY = "modifiedTime";
    const history = useHistory();
    const [evaluationList, setEvaluationList] = useState(null);
    const {user, isAuthenticated, isLoading} = useAuth0();

    // initalize data
    useEffect(() => {
        fetch("http://localhost:3001/report/new")
            .then((response) => response.json())
            .then((data) => {
                setEvaluationList(convertToDataClass(data));
            })
            .catch(console.error);
    }, []);

    function selectEvaluation(id) {
        const requestURL = `http://localhost:3001/report/new?evaluation_id=${id}&author_name=${user.name}`;
        // console.log(requestURL);
        fetch(requestURL)
            .then((response) => response.json())
            .then(({report_id}) =>
                history.replace({
                    pathname: "/report_overview",
                    state: {
                        report_id
                    },
                })
            );
    };

    function convertToDataClass(data) {
        return data.map(data=>new EvaluationInfoData(data));
    }

    if (evaluationList == null )
        return <h1> Loading ... </h1>;

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Select an evaluation to base your evaluation
                </NavBar>
            </div>
            <div className='content scrollable'>
                <CardList 
                    list={evaluationList}
                    searchProperty={SEARCH_PROPERTY} 
                    sortByProperty={SORTBY_PROPERTY}
                    CardReactComponent={EvaluationInfo}
                    dataClass={EvaluationInfoData}
                    onClick={selectEvaluation}
                />
            </div>
        </div>
    );
}


export default EvaluationSelection;
