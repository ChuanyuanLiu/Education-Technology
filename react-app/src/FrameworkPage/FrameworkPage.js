import React, {Component} from "react";
import "./FrameworkPage.css";
// import {UserOutlined} from "@ant-design/icons";
import FrameworkInfo from "./FrameworkInfo";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import BigButton from "../Utils/BigButton";
import {FrameworkInfoData} from "../Utils/DataClass";

class FrameworkPage extends Component {
    SEARCH_FIELD = "framework_title";

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
        this.props.history.push({
            pathname: "/framework_overview",
            state: {
                framework_id,
            },
        });
    }

    createNew() {
        fetch("http://localhost:3001/framework/new")
            .then((response) => response.json())
            .then((data) => {
                this.handleClick(data.framework_id);
            });
    }

    render() {
        return (
            <div className='flex_container'>
                <div className='header'>
                    <NavBar>Frameworks</NavBar>
                </div>
                <div className='content scrollable'>
                    <CardList
                        searchField={this.SEARCH_FIELD}
                        list={this.state.frameworks}
                        CardReactComponent={FrameworkInfo}
                        dataClass={FrameworkInfoData}
                        onClick={this.handleClick}
                    />
                </div>
                <div className='footer'>
                    <BigButton onClick={this.createNew}>
                        New Framework
                    </BigButton>
                </div>
            </div>
        );
    }
}

export default FrameworkPage;
