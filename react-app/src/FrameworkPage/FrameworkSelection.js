import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import FrameworkInfo from "../FrameworkPage/FrameworkInfo";
import {FrameworkInfoData} from "../Utils/DataClass";

function FrameworkSelection() {
    const SEARCH_PROPERTY = "title";
    const SORTBY_PROPERTY = "creationTime";
    const [frameworks, setFrameworks] = useState([]);
    const history = useHistory();
    const {user, role} = history.location.state;

    const convertToDataClass = (data) => {
        return data.map((data) => new FrameworkInfoData(data));
    };

    useEffect(() => {
        fetch("http://139.99.155.172:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                let frameworks = [];
                for (const frameworkData of convertToDataClass(data)) {
                    if (frameworkData.isActive()) {
                        frameworks.push(frameworkData);
                    }
                }
                setFrameworks(frameworks);
            });
    }, []);

    const createNewEvaluation = (id) => {
        const requestURL = `http://139.99.155.172:3001/evaluation/new?framework_id=${id}&author_name=${user}`;
        // console.log(requestURL);
        fetch(requestURL)
            .then((response) => response.json())
            .then(({evaluation_id}) =>
                history.replace({
                    pathname: "/evaluation_overview",
                    state: {
                        evaluation_id,
                        framework_id: id,
                        user,
                        role
                    },
                })
            );
    };

    if (frameworks.length === 0 ) {
        return <h1>Loading .. </h1>;
    }

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>Select a framework to base your evaluation</NavBar>
            </div>
            <div className='content scrollable'>
                <CardList
                    list={frameworks}
                    searchProperty={SEARCH_PROPERTY}
                    sortByProperty={SORTBY_PROPERTY}
                    CardReactComponent={FrameworkInfo}
                    onClick={createNewEvaluation}
                />
            </div>
        </div>
    );
}

export default FrameworkSelection;
