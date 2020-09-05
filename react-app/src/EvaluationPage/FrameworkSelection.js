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
    render (){
        const frameworkList = this.state.frameworks.map(framework => <FrameworkComponent key={framework.id} item={framework}/>)
        return (       
            <div>
                <NavBar title = 'Choose Framework' />
                <SearchBar />
                {frameworkList}
            </div>
    )}
}

export default FrameworkSelection;