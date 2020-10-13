import React from "react";
import NavBar from "../Utils/NavBar";
import {Layout} from "antd"
import "./HomePage.css";
import {useHistory} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useRole } from "../Utils/UseRole";
const {Content} = Layout;

function PageOptionList(props) {
    const history = new useHistory();
    const list_names = [
        "Evaluations",
        "Reports",
        "Frameworks",
        "User Management",
        "Settings",
    ];

    const route_name = [
        "./evaluation",
        "./report",
        "./framework",
        "./user_management",
        "./setting"
    ];

    function handleClick(key){
        history.push(route_name[key])
    }

    return (
        <div className='center'>
        <div className='PageOptionList'>
            {list_names.map((name,i) => (
                    <div className="Option clickable" key={i} onClick={()=> handleClick(i)}>
                        <div className="Button">
                    {name}
                    </div>
                    </div>
            ))}
        </div>
        </div>
    );
}

// Uncomment lines 50, 52, and 61 to use the UseRole hook
function HomePage(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    // const { error, roles, loading: rolesLoading, refresh } = useRole();

    // if (isLoading || rolesLoading) {
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        isAuthenticated && (
            <div className='HomePage'>
                <Layout>
                    {/* <NavBar disableBack="true"> Welcome back, {roles[0].name} {user.name}! </NavBar> */}
                    <NavBar disableBack="true"> Welcome back, {user.name}! </NavBar>
                    <Content >
                        <PageOptionList />
                    </Content>
                </Layout>
            </div>
        )
    );
}

export default HomePage;
