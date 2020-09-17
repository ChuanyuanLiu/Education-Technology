import React, {Component} from "react";
import "./FrameworkPage.css";
import {UserOutlined} from "@ant-design/icons";
import FrameworkComponent from "./FrameworkComponent";
import NavBar from "../Utils/NavBar";
import SearchBar from "../Utils/SearchBar";
import BigButton from "../Utils/BigButton";

class FrameworkPage extends Component {
    constructor() {
        super();
        this.state = {
            frameworks: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                this.setState({frameworks: data});
            });
    }

    // go directly to the frameworkß
    handleClick(framework_id) {
        this.props.history.replace({
            pathname: "/framework_overview",
            state: {
                framework_id,
            },
        });
    }

    render() {
        const frameworkList = this.state.frameworks.map((framework, i) => (
            <div className="clickable">
                <FrameworkComponent
                key={i}
                item={framework}
                handleClick={this.handleClick}
                />              
            </div>

        ));
        return (
            <div className='flex_container'>
                <div className='header'>
                    <NavBar>
                        Frameworks
                        <SearchBar />
                    </NavBar>
                </div>
                <div className='content'>{frameworkList}</div>
                <div className='footer'>
                    <BigButton onClick={() => this.handleClick(-1)}>
                        New Framework
                    </BigButton>
                </div>
            </div>
        );
    }
}

export default FrameworkPage;
