import React from 'react'
import NavBar from '../Utils/NavBar'
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
            choice: "0",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    // TODO bug where options does not store all of data.rates
    componentWillMount(){
        fetch("http://localhost:3001/evaluation?evaluation_id="+ this.props.location.state.evaluation_id
        + "&question_id=" + this.props.location.state.question_id)
        .then(response => response.json())
        .then(data => {
                this.setState(prevState => ({
                    id:data.question_id,
                    title:data.question_title,
                    comment:data.response_comment,
                    choice: data.rate_chosen.toString(),
                    options: data.rates.map(element =>element.rate_criterion)
            }))
        })

    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleClick = ()=> {
        console.log("Button pressed");
        console.log(this.props.history);
        this.props.history.go(4);
    }

    render(){
        return (
            <div>
                <NavBar title={this.state.title}/>
                <form>
                    <div className='section_header'>Rating</div>

                    <QuestionComponent data={this.state.options} 
                                       choice={this.state.choice} 
                                       handleChange={this.handleChange}/>

                    <div className='section_header'>Comment</div>
                    <nr />
                    <textarea name="comment"
                              value={this.state.comment}
                              onChange={this.handleChange}/>

                    {/* <div className="buttomButton"
                            onClick = {this.handleClick}>
                         <BigButton 
                            name="Save"/>
                    </div> */}
                </form>
            </div>
        )}
}

export default Question