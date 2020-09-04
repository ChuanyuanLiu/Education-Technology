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
                    <div className="Option" key={i}>
                        <div className="Button">
                    {name}
                    </div>
                    </div>
            ))}
        </div>
        </div>
    );
}

function HomePage() {
    return (
        <div className='HomePage'>
            <Layout>
                <NavBar title='Header'/>
                <Content>
                    <PageOptionList />
                </Content>
            </Layout>
        </div>
    );
}

export default HomePage;
