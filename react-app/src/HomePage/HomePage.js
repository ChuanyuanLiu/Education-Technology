import React from "react";
import NavBar from "../Utils/NavBar";
import {Layout} from "antd"
import "./HomePage.css";
const {Content} = Layout;

function PageOptionList() {
    const list_names = [
        "Evaluations",
        "Reports",
        "Frameworks",
        "User Management",
        "Settings",
    ];

    return (
        <div className='center'>
        <div className='PageOptionList'>
            {list_names.map((name,i) => (
                    <div className="Option clickable" key={i}>
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
            <Layout>
                <NavBar> Home </NavBar>
                <Content  onClick={()=>{props.history.push('./evaluation')}}>
                    <PageOptionList />
                </Content>
            </Layout>
        </div>
    );
}

export default HomePage;
