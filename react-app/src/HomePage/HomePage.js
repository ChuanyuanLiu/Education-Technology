import React from "react";
import NavBar from "../Utils/NavBar";
import {Layout} from "antd"
import "./HomePage.css";
import {useHistory} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
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

function HomePage(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
<<<<<<< HEAD
        <div className='HomePage'>

                <NavBar> Home </NavBar>
                <Content >
                    <PageOptionList />
                </Content>

        </div>
=======
        isAuthenticated && (
            <div className='HomePage'>
                <Layout>
                    <NavBar> Welcome back, {user.name}! </NavBar>
                    <Content >
                        <PageOptionList />
                    </Content>
                </Layout>
            </div>
        )
>>>>>>> 6df0abc98d4a469b493b51df6d236da562f6520d
    );
}

export default HomePage;
