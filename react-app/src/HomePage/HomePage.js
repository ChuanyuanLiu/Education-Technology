import React from "react";
import NavBar from "../Utils/NavBar";
import { Layout } from "antd"
import "./HomePage.css";
import { useHistory, useState } from "react-router-dom";
import { useRole } from "../Utils/UseRole";
import { useMetadata } from "../Utils/UseMetadata";
const {Content} = Layout;

function PageOptionList({role}) {
    const history = new useHistory();
    const whole_fuctions = [
        "Evaluations",
        "Reports",
        "Frameworks",
        "User Management",
        // "Settings",
    ];

    const whole_routes = [
        "./evaluation",
        "./report",
        "./framework",
        "./user_management",
        // "./setting"
    ];

    const guest_fuctions = [
        "Evaluations",
        "Reports",
        "Frameworks"
        // "Settings",
    ];

    const guest_routes = [
        "./evaluation",
        "./report",
        // "./setting"
    ];

    function handleClick(key){
        history.push(whole_routes[key])
    }

    return (
        <div className='center'>
        <div className='PageOptionList'>
            {role === "Senior Consultant"? 
                whole_fuctions.map((name,i) => (
                    <div className="Option clickable" key={i} onClick={()=> handleClick(i)}>
                        <div className="Button">
                            {name}
                        </div>
                    </div>
                ))
                :
                guest_fuctions.map((name,i) => (
                    <div className="Option clickable" key={i} onClick={()=> handleClick(i)}>
                        <div className="Button">
                            {name}
                        </div>
                    </div>))
            }
        </div>
        </div>
    );
}

// Uncomment lines 50, 52, and 61 to use the UseRole hook
function HomePage(props) {
    const user = {
        name : "Gale"
    } 
    const isAuthenticated = true
    const isLoading  = false
    const { error: roleError, roles, loading: rolesLoading } = useRole();
    const { error: metadataError , metadata, loading: metadataLoading } = useMetadata();

    if (isLoading || rolesLoading || metadataLoading) {
    // if (isLoading) {
        return <div>Loading...</div>;
    }

    if (roleError) {
        console.log(roleError);
    }

    if (metadataError) {
        console.log(metadataError);
    }
    
    return (
        isAuthenticated && (
            <div className='HomePage'>
                <Layout>
                    {
                        metadata.active ?
                            <NavBar disableBack="true"> Welcome back, {user.name}! </NavBar>
                        :
                            <NavBar disableBack="true"> Inactive user, contact the senior consultant </NavBar>
                    }
                    {
                        metadata.active && 
                        <Content >
                            <PageOptionList role = {roles[0].name}/>
                        </Content>
                    }
                    
                </Layout>
            </div>
        )
    );
}

export default HomePage;
