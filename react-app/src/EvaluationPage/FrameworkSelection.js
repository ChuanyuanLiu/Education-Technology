import React, { useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import FrameworkInfo from "../FrameworkPage/FrameworkInfo";
import {FrameworkInfoData} from "../Utils/DataClass";
import { useAuth0 } from '@auth0/auth0-react';


function FrameworkSelection(){
    const SEARCH_PROPERTY = "title";
    const [frameworks, setFrameworks] = useState([])
    const history = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const convertToDataClass = (data) => {
        return data.map((data) => new FrameworkInfoData(data));
    }
    useEffect(()=>{
        fetch("http://localhost:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                let frameworks = [];
                for (const frameworkData of convertToDataClass(data)) {
                    if (frameworkData.isActive()) {
                        frameworks.push(frameworkData);
                    }
                }
                console.log(data)
                setFrameworks(frameworks);
            });
    }, [])
    if (frameworks.length === 0){
        return <h1>Loading .. </h1>;
    }
    const handleClick = (id) => {

        const requestURL =
            `http://localhost:3001/evaluation/new?framework_id=${id}&author_name=${user.name}`;
        console.log(requestURL)
        fetch(requestURL)
            .then((response) => response.json())
            .then(({evaluation_id}) =>
                history.replace({
                    pathname: "/evaluation_overview",
                    state: {
                        evaluation_id,
                        framework_id: id,
                    },
                })
            );
    }
    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>Frameworks</NavBar>
            </div>
            <div className='content scrollable'>
                <CardList
                    searchProperty={SEARCH_PROPERTY}
                    list={frameworks}
                    CardReactComponent={FrameworkInfo}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}

export default FrameworkSelection;
