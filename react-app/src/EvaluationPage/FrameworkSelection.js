import React from "react";
import "./EvaluationPage.css";
import NavBar from "../Utils/NavBar";
import SearchBar from "../Utils/SearchBar";
import FrameworkComponent from "../FrameworkPage/FrameworkComponent";

class FrameworkSelection extends React.Component {
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
    handleClick(framework_id) {
        const requestURL =
            "http://localhost:3001/evaluation/new?framework_id=" + framework_id;
        fetch(requestURL)
            .then((response) => response.json())
            .then(({evaluation_id}) =>
                this.props.history.replace({
                    pathname: "/evaluation_overview",
                    state: {
                        evaluation_id,
                        framework_id,
                    },
                })
            );
    }

    render() {
        const frameworkList = this.state.frameworks.map((framework, i) => (
            <FrameworkComponent
                key={i}
                item={framework}
                handleClick={this.handleClick}
            />
        ));
        return (
            <div className='flex_container'>
                <div className='header'>
                    <NavBar>
                        Choose Framework
                        <SearchBar />
                    </NavBar>
                </div>
                <div className='content'>{frameworkList}</div>
            </div>
        );
    }
}

export default FrameworkSelection;
