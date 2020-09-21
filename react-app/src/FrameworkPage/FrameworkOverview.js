import React, { useEffect, useState} from "react"
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput"
import StatusSwitch from "../Utils/StatusSwitch"
import { useHistory } from "react-router-dom";
import {RightOutlined, DownOutlined, EditOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons"
/*
(Route from FrameworkPage)
Framework Overview Page
    |-- Statue
        |--  Active Switch
        |-- Published Switch
    |-- SectionList
            |-- Section
                    |-- Question (rout to Question Page)
                    |-- Add Question
            |-- Add Section
    |-- Footer
*/

function FrameworkOverview({history}){
    const {framework_id} = history.location.state
    const [framework_data, setFramework] = useState(null)
    function initializeFramework(){
        const new_framework = {
            framework_title: "New Framework",
            framework_author: "",
            sections: []
          }
        setFramework(new_framework)
    }
    useEffect(() => {
        // Create a new framework if id is set as -1.
        if(framework_id !== -1){
            fetch(
                `http://localhost:3001/framework?framework_id=${framework_id}`
            )
                .then(response => response.json())
                .then(setFramework)
        }else{
            initializeFramework();
            //TODO: post the initialized framework
        }
    },[framework_id])

    if (framework_data == null) {
        return <h1>Loading...</h1>;
    }
    //Add section to framework, called from SectionList
    const addSection = ()=>{
        const newSection = {
            section_title:"New Section",
            questions:[]
        }
        setFramework((prevState) => ({
            framework_id: prevState.framework_id,
            framework_title: prevState.framework_title,
            sections:[...prevState.sections, newSection]
            
        }))
    }
    //Add question with given section_id, called from EditableSection
    const addQuestion = (section_id) => {
        const newQuestion = {
            question_title: "New Question"
        }
        setFramework((prevState) => ({
            framework_id: prevState.framework_id,
            framework_title: prevState.framework_title,
            sections: prevState.sections.map(data => {
                if(data.section_id === section_id ){
                   return {
                       section_id: data.section_id,
                       section_title: data.section_title,
                       questions: [...data.questions, newQuestion]
                   }
                }
                return data
            })
        }))
    }

    //TODO for POST request
    // const PostFramework = ()=>{
    //     alert("saved")
    // }

    return  <div>
                <NavBar>
                    <TextInput text={framework_data.framework_title}/>
                </NavBar>
                <div className="section_header">Status</div>
                <StatusSwitch switchName="Active" />
                <StatusSwitch switchName="Published" />
                <SectionList addSection={addSection}
                             addQuestion={addQuestion} 
                             sections={framework_data.sections}/>
            </div>
}

function SectionList(props){
    return (
        <div>
            <div className='section_header'>Sections</div>
            <div>
                {props.sections.map((section, i) => <EditableSection addQuestion={props.addQuestion}
                                                                     section_index={i} 
                                                                     section={section}/>)}
            </div>
            <div className="editable_section clickable new_section"
                onClick={props.addSection}>
                Add Section
                <PlusOutlined onClick={props.handleClick} className="right_button add_button" />
           </div>
        </div>
    ) 
}

function EditableSection(props){
        // track expand or not
    const [getExpand, setExpand] = useState(false)
    const [getActive, setActive] = useState(false)
    const [getText, setText] = useState(props.section.section_title)
    const [getLastText, setLastText] = useState(props.section.section_title)
    // TO expand a section to see questions
    const toggleExpand = (event) => {
        event.preventDefault()
        setExpand(!getExpand)
    }
    // Save the changes to section title
    const toggleSave = (event) => {
        event.preventDefault()
        setActive(!getActive)
        // Document current text to prevent roll back
        if(getActive === true){
            setLastText(getText);
        }
    }
    //Called when user click "x" while editing section title
    const toggleRollBack = (event) =>{
        event.preventDefault();
        setActive(!getActive)
        setText(getLastText)
    }
    //Handle change of the value
    const handleChange = (event) =>{
        const {value} = event.target
        setText(value)
    }
    //input style for section title
    const inputStyle={
        backgroundColor: "transparent",
        width: (getText.length > 10? (getText.length + 1)*8 + 'px': "88px"),
        paddingLeft: "5px",
        border: getActive? "1px black solid":"0px black solid",
        widthMin: "30px"
    }

    return <div>
                <div className="editable_section" >
                    <div className="section_input clickable" onClick={getActive? null: toggleExpand}> 
                        <span>Section {props.section_index + 1}</span>
                            {getActive?  <input value={getText}
                                                disabled={!getActive}
                                                style={inputStyle}
                                                onChange={handleChange}
                                />: <span> {getText} </span>         
                            }
                        </div>
                    {/* Button to change the title */}
                    <div className="section_input_button">
                        {getActive? <span >                                        
                                        <CheckOutlined className="saveOrNot" onClick={toggleSave}/> 
                                        <CloseOutlined className="saveOrNot" onClick={toggleRollBack}/>
                                    </span>
                                    :
                                    <EditOutlined onClick={toggleSave}/>}
                    </div>
                    {/* right button to fold the section */}
                    <div className="right_button">
                        {getExpand? <DownOutlined onClick={toggleExpand}/> : 
                                    <RightOutlined onClick={toggleExpand}/>}                    
                    </div>
                </div>   

                <ul className={getExpand? "question_list": null}>
                    {
                        getExpand?
                            <div>{props.section.questions.map(
                                        (data, i) => <Question 
                                        section_index={props.section_index}
                                        question_index={i}
                                        question={data} 
                                        key={i} />)}
                                    <div className="clickable new_question"
                                         onClick={()=>props.addQuestion(props.section.section_id)} >
                                        Add Question
                                        <PlusOutlined 
                                        className="right_button add_button" />
                                    </div>
                            </div>
                        : null
                    }
                </ul>
                
            </div>
    
}

function Question(props){
    const history = useHistory()
    const handleClick = () => {
        history.push({
            pathname: "./framework_question",
            state: {
                question_id: props.question.question_id
            },
        });
    }
    return <div className="Question clickable" onClick={handleClick}>
                {props.section_index + 1}.{props.question_index + 1} {props.question.question_title}
                <RightOutlined className="right_button" />
           </div>
}

 


export default FrameworkOverview