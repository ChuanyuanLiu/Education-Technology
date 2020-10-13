import React, {Component} from "react";
import "./FrameworkPage.css";
// import {UserOutlined} from "@ant-design/icons";
import FrameworkInfo from "./FrameworkInfo";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import BigButton from "../Utils/BigButton";
import {FrameworkInfoData} from "../Utils/DataClass";

class FrameworkPage extends Component {
    #SEARCH_PROPERTY = "title"    
    #SORTBY_PROPERTY = "createdTime";

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
                this.setState({frameworks: this.convertToDataClass(data)});
            });
    }

    // async componentDidMount() {
    //     const response = await fetch("http://localhost:3001/framework");
    //     const data = await response.json()
    //     this.setState({frameworks: this.convertToDataClass(data)});
    // }
    
    convertToDataClass(data) {
        return data.map(data=>new FrameworkInfoData(data));
    }

    // go directly to the framework
    handleClick(id) {
        this.props.history.push({
            pathname: "/framework_overview",
            state: {
                framework_id: id
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
        if (this.state.frameworks.length === 0) return <h1>Loading .. </h1>;
        return (
            <div className='flex_container'>
                <div className='header'>
                    <NavBar>Frameworks</NavBar>
                </div>
                <div className='content scrollable'>
                    <CardList
                        searchProperty={this.#SEARCH_PROPERTY}
                        sortByProperty={this.#SORTBY_PROPERTY}
                        list={this.state.frameworks}
                        CardReactComponent={FrameworkInfo}
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
