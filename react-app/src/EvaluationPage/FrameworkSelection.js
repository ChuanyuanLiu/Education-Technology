import React from "react";
import "./EvaluationPage.css"
import NavBar from "../Utils/NavBar"
import SearchBar from "../Utils/SearchBar"
import FrameworkComponent from "./FrameworkComponent";

class FrameworkSelection extends React.Component{
    constructor(){
        super()
        this.state = {
            frameworks: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        fetch("http://localhost:3001/evaluation/new")
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {frameworks: data}
                )
            })
    }
    handleClick(framework_id){
        const requestURL = 'http://localhost:3001/evaluation/new?framework_id=' + framework_id
        fetch(requestURL)
            .then(response => response.json())
            .then(data => alert(data.evaluation_id))
    }

    render (){
        const frameworkList = this.state.frameworks.map(framework => 
                                                            <FrameworkComponent 
                                                                key={framework.id}  
                                                                item={framework} 
                                                                handleClick={this.handleClick}/>)
        return (       
            <div>
                <NavBar title = 'Choose Framework' />
                <SearchBar />
                {frameworkList}
            </div>
    )}
}

export default FrameworkSelection;