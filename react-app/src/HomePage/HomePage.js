import React from "react";
import {Layout} from "antd";
import "./HomePage.css";
const {Header, Content} = Layout;

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
                <Header className='Header'>Home</Header>
                <Content>
                    <PageOptionList />
                </Content>
            </Layout>
        </div>
    );
}

export default HomePage;
