import React from "react"
import "./SearchBar.css"
import {Input} from  'antd'
const { Search } = Input;
class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            search: "",
            sortBy: "mostRecent"
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    handleSearch = event =>{
        alert("searching")
        console.log("searching")
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
        <div className="SearchBar">
            <Search 
                type = "text"
                name = "search"
                placeholder = "search.."
                onSearch = {this.handleSearch}
                onChange = {this.handleChange}
                value = {this.state.search}
            />

        </div>
        )
    }
}

export default SearchBar