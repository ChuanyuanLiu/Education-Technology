import React from "react";
import NavBar from "../Utils/NavBar";
import {Layout} from "antd"
import "./HomePage.css";
import {useHistory} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useRole } from "../Utils/UseRole";
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
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { error, roles, loading: rolesLoading, refresh } = useRole();

    if (isLoading || rolesLoading) {
    // if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
    }
    
    return (
        isAuthenticated && (
            <div className='HomePage'>
                <Layout>
                    {/* <NavBar disableBack="true"> Welcome back, {roles[0].name} {user.name}! </NavBar> */}
                    <NavBar disableBack="true"> Welcome back, {user.name}! </NavBar>
                    <Content >
                        <PageOptionList role = {roles[0].name}/>
                    </Content>
                </Layout>
            </div>
        )
    );
}

export default HomePage;
