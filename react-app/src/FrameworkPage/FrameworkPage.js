import React, {useEffect, useState} from "react";
import "./FrameworkPage.css";
// import {UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import FrameworkInfo from "./FrameworkInfo";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import BigButton from "../Utils/BigButton";
import {FrameworkInfoData} from "../Utils/DataClass";
import { useAuth0 } from '@auth0/auth0-react';


function FrameworkPage (){
    const SEARCH_PROPERTY = "title";
    const [frameworks, setFrameworks] = useState([])
    const history = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const convertToDataClass = (data) => {
        return data.map(data=>new FrameworkInfoData(data));
    }

    // go directly to the framework
    const handleClick = (id) => {
        history.push({
            pathname: "/framework_overview",
            state: {
                framework_id: id
            },
        });
    }

    const createNew = ()=> {
        fetch(`http://localhost:3001/framework/new?author_name=${user.name}`)
            .then((response) => response.json())
            .then((data) => {
                handleClick(data.framework_id);
            });
    }
    useEffect(() => {
        fetch("http://localhost:3001/framework")
        .then((response) => response.json())
        .then((data) => {
            setFrameworks(convertToDataClass(data));
        });
    })

    if (frameworks.length === 0) return <h1>Loading .. </h1>;

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
            <div className='footer'>
                <BigButton onClick={createNew}>
                    New Framework
                </BigButton>
            </div>
        </div>
    );
}

export default FrameworkPage;
