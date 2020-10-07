import React from "react";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import FrameworkInfo from "../FrameworkPage/FrameworkInfo";
import { FrameworkInfoData } from "../Utils/DataClass";

class FrameworkSelection extends React.Component {
    SEARCH_FIELD = "framework_title";
    constructor() {
        super();
        this.state = {
            frameworks: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/evaluation/new")
            .then((response) => response.json())
            .then((data) => {
                this.setState({frameworks: data});
            });
    }

    // go directly to the new evaluation
    handleClick(id) {
        const requestURL =
            "http://localhost:3001/evaluation/new?framework_id=" + id;
        fetch(requestURL)
            .then((response) => response.json())
            .then(({evaluation_id}) =>
                this.props.history.replace({
                    pathname: "/evaluation_overview",
                    state: {
                        evaluation_id,
                        framework_id: id,
                    },
                })
            );
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
                        searchField={this.SEARCH_FIELD}
                        list={this.state.frameworks}
                        CardReactComponent={FrameworkInfo}
                        dataClass={FrameworkInfoData}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default FrameworkSelection;
