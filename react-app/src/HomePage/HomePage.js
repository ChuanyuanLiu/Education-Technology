import React from "react";
import NavBar from "../Utils/NavBar";
import {Layout} from "antd"
import "./HomePage.css";
import {useHistory} from "react-router-dom";
const {Content} = Layout;

function PageOptionList(props) {
    const history = new useHistory()
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
    return (
        <div className='HomePage'>

                <NavBar> Home </NavBar>
                <Content >
                    <PageOptionList />
                </Content>

        </div>
    );
}

export default HomePage;
