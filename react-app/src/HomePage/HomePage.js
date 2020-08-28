import React from "react";
import {Layout, Row, Col} from "antd";
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
        <div className='PageOptionList'>
            <Row align="center" >
                {list_names.map((name) => (
                    <Col className="Col" xs={24} md={7}>
                        {name}
                    </Col>
                ))}
            </Row>
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
