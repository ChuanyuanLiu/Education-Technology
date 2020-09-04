import React from 'react'
import NavBar from '../Utils/NavBar'
import questionData from './questionData.json'
import BigButton from '../Utils/BigButton'
import QuestionContainer from "./QuestionComponent"
import "./EvaluationPage.css"

class Question extends React.Component {

    constructor(){
        super()
        this.state = {
            id:"",
            title:"",
            comment:"",
            options: {
                notApplicable: "",
                belowBasic: "",
                basic:"",
                adequate:"",
                exceptional:"" 
            },
            choice: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //Once the page is loaded fetch data from API. Fake data for now
    componentDidMount(){
        this.setState({
            id:questionData.id,
            title:questionData.title,
            comment:questionData.comment,
            options: {
                notApplicable: questionData.options.notApplicable,
                belowBasic: questionData.options.belowBasic,
                basic: questionData.options.basic,
                adequate: questionData.options.adequate,
                exceptional: questionData.options.exceptional
            }
        })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = ()=> {
        alert("submitted")
        this.props.history.push("/evaluation_overview")

    }
    render(){
        return (
            <div>
                <NavBar title={this.state.title}/>
                <form onSubmit={this.handleSubmit}>
                    <div className='section_header'>Rating</div>

                    <QuestionContainer data={this.state.options} 
                                       choice={this.state.choice} 
                                       handleChange={this.handleChange}/>

                    <div className='section_header'>Comment</div>
                    <nr />
                    <textarea name="comment"
                              value={this.state.comment}
                              onChange={this.handleChange}/>

                    <div className="buttomButton">
                        <BigButton name="Save" handleClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )}
}

export default Question