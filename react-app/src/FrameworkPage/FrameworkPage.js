import React, {Component} from "react";
import "./FrameworkPage.css";
// import {UserOutlined} from "@ant-design/icons";
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
        this.createNew = this.createNew.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                this.setState({frameworks: data});
            });
    }

    // go directly to the framework
    handleClick(framework_id) {
        this.props.history.replace({
            pathname: "/framework_overview",
            state: {
                framework_id,
            },
        });
    }

    createNew(){
        var newId
        fetch("http://localhost:3001/framework/new")
        .then((response) => response.json())
        .then((data) => {
            alert(data)
        })
        // this.handleClick(newId)
    }

    render() {
        const frameworkList = this.state.frameworks.map((framework, i) => (
            <div className="clickable" key={i}>
                <FrameworkComponent
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
                <div className='content scrollable'>{frameworkList}</div>
                <div className='footer'>
                    <BigButton onClick={() => this.createNew}>
                        New Framework
                    </BigButton>
                </div>
            </div>
        );
    }
}

export default FrameworkPage;
