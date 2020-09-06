import React from 'react'
import NavBar from '../Utils/NavBar'
import questionData from './questionData.json'
import BigButton from '../Utils/BigButton'
import QuestionComponent from "./QuestionComponent"
import "./EvaluationPage.css"

class Question extends React.Component {
    constructor(){
        super()
        this.state = {
            id:"",
            title:"",
            comment:"",
            options:[],
            choice: "0"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount(){

        this.setState(prevState => ({
            id:questionData.question_id,
            title:questionData.question_title,
            comment:questionData.response_comment,
            choice: questionData.rate_chosen.toString(),
            options: [...questionData.rates]
        }))
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = ()=> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Question' + this.state.id })
        };
        // fetch('/evaluation/update/response?evaluation_id=1&question_id=1', requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));

        // this.props.history.push("/evaluation_overview")

    }
    render(){
        return (
            <div>
                <NavBar title={this.state.title}/>
                <form onSubmit={this.handleSubmit}>
                    <div className='section_header'>Rating</div>

                    <QuestionComponent data={this.state.options} 
                                       choice={this.state.choice} 
                                       handleChange={this.handleChange}/>

                    <div className='section_header'>Comment</div>
                    <nr />
                    <textarea name="comment"
                              value={this.state.comment}
                              onChange={this.handleChange}/>

                    <div className="buttomButton">
                         <BigButton name="Save"/>
                    </div>
                </form>
            </div>
        )}
}

export default Question