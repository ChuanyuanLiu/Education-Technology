import React from "react";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";
import FrameworkInfo from "../FrameworkPage/FrameworkInfo";
import {FrameworkInfoData} from "../Utils/DataClass";

class FrameworkSelection extends React.Component {
    SEARCH_PROPERTY = "title";
    constructor() {
        super();
        this.state = {
            frameworks: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    // Filter out only active frameworks
    componentDidMount() {
        fetch("http://localhost:3001/framework")
            .then((response) => response.json())
            .then((data) => {
                let frameworks = [];
                for (const frameworkData of this.convertToDataClass(data)) {
                    if (frameworkData.isActive()) {
                        frameworks.push(frameworkData);
                    }
                }
                this.setState({frameworks});
            });
    }

    convertToDataClass(data) {
        return data.map((data) => new FrameworkInfoData(data));
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
                        searchProperty={this.SEARCH_PROPERTY}
                        list={this.state.frameworks}
                        CardReactComponent={FrameworkInfo}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default FrameworkSelection;
