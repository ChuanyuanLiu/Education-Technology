import React, {useEffect, useState} from "react";
import "./FrameworkPage.css";
// import {UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import FrameworkInfo from "./FrameworkInfo";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import BigButton from "../Utils/BigButton";
import {FrameworkInfoData} from "../Utils/DataClass";
import { useRole } from "../Utils/UseRole";
import { useAuth0 } from '@auth0/auth0-react';

function FrameworkPage() {
    const SEARCH_PROPERTY = "title";
    const SORTBY_PROPERTY = "creationTime";
    const [frameworks, setFrameworks] = useState([]);
    const history = useHistory();

    const { error, roles, loading: rolesLoading, refresh } = useRole();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const AUTH_ROLE = "Senior Consultant"

    const convertToDataClass = (data) => {
        return data.map((data) => new FrameworkInfoData(data));
    };

    useEffect(() => {
        let isCancelled = false
        fetch("http://139.99.155.172:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                if(!isCancelled){
                    setFrameworks(convertToDataClass(data));
                }
            });
        return ()=>{
            isCancelled = true
        }
    }, []);

    if (frameworks.length === 0 || rolesLoading) return <h1>Loading .. </h1>;

    // go directly to the framework
    const goToFrameworkOverview = (id) => {
        history.push({
            pathname: "/framework_overview",
            state: {
                framework_id: id,
                role: roles[0].name
            },
        });
    };

    const createNew = () => {
        fetch(`http://139.99.155.172:3001/framework/new?author_name=${user.name}`)
            .then((response) => response.json())
            .then((data) => {
                goToFrameworkOverview(data.framework_id);
            });
    };

    //Non-Admin user can only see active frameworks
    const renderList = roles[0].name === AUTH_ROLE? frameworks : 
        frameworks.filter(framework => {
            if(framework.isActive()){
                return framework
            }
        })
    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>Framework</NavBar>
            </div>
            <div className='content scrollable'>
                <CardList
                    searchProperty={SEARCH_PROPERTY}
                    sortByProperty={SORTBY_PROPERTY}
                    list={renderList}
                    CardReactComponent={FrameworkInfo}
                    onClick={goToFrameworkOverview}
                />
            </div>
            <div className='footer'>
                {roles[0].name === AUTH_ROLE?
                    <BigButton onClick={createNew}>New Framework</BigButton>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default FrameworkPage;
