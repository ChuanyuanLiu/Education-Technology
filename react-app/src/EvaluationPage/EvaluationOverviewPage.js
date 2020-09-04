import React, {useState} from "react";
import NavBar from "../Utils/NavBar";
import "./EvaluationOverview.css";
import framework_data from "./framework.json";
import { useHistory } from "react-router-dom";
/*
Evaluation Page Layout
|-- NavBar
|-- Summary
|-- SectionList
        |-- Section
                |-- Question
*/

function Summary({data = ""}) {
    // track changes to summary
    const [getSummary, setSummary] = useState(data);
    const appendSummary = (event) => {
        setSummary(event.target.value);
    };
    // tracks if the interface is active for editing
    const [getActive, setActive] = useState(false);
    const toggleActive = (event) => {
        event.preventDefault();
        setActive(!getActive);
    };

    return (
        <form>
            <div className='section_header'>
                Summary
                <button onClick={toggleActive} className='right'>
                    {getActive ? "save" : "edit"}
                </button>
            </div>
            <textarea
                disabled={!getActive}
                onChange={appendSummary}
                value={getSummary}
            />
        </form>
    );
}

// data is a question object that contains
// Question_Title, Question_ID
function Question({question_title, question_id, section_index, index}) {
    const history = useHistory();
    function handleClick(){
        history.push('./question')
    }
    return <li onClick={handleClick}>{`${section_index+1}.${index+1} ${question_title}`}</li>;
}

// data is a list of question objects each contains
// Question_Title, Question_ID
function Section( {section_title, section_id, questions, index}) {
    // track expand or not
    const [getExpand, setExpand] = useState(false);
    const toggleExpand = (event) => {
        event.preventDefault();
        setExpand(!getExpand);
    }

    return (
        <>
            <div className="sub_header">
                {`Section ${index + 1} ${section_title}`}
                <button className="right" onClick={toggleExpand}>{getExpand ? "collapse" : "expand"}</button>
            </div>
            <ul>
                {getExpand ? questions.map((s, i) => (
                    <Question  {...s} key={i} index={i} section_index={index} />
                )) : null}
            </ul>
        </>
    );
}

// Sections is a list of sections object each contains
// Section_Title, Section_ID, Questions
function SectionsList({sections}) {
    return (
        <>
            <div className='section_header'>Sections</div>
            {sections.map((s, i) => (
                <Section key={i} index={i} {...s} />
            ))}
        </>
    );
}

function EvaluationOverviewPage(props) {
    return (
        <div className='EvaluationPage'>
            <NavBar title={framework_data.framework_title} />
            <Summary />
            <SectionsList {...framework_data}  />
        </div>
    );
}

export default EvaluationOverviewPage;
