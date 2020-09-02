import React, {useState} from "react";
import NavBar from "../Utils/NavBar";
import "./Evaluation.css";
import framework_data from "./framework.json";

/*
Evaluation Page Layout
|-- NavBar
|-- Summary
|-- SectionList
        |-- QuestionList
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
                    edit
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
    return <li>{`${section_index+1}.${index+1} ${question_title}`}</li>;
}

// data is a list of question objects each contains
// Question_Title, Question_ID
function QuestionList({section_title, section_id, questions, index}) {
    return (
        <>
            <div className="sub_header">
                {`Section ${index + 1} ${section_title}`}
                <button className="right">Expand</button>
            </div>
            <ul>
                {questions.map((s, i) => (
                    <Question {...s} key={i} index={i} section_index={index} />
                ))}
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
                <QuestionList key={i} index={i} {...s} />
            ))}
        </>
    );
}

function EvaluationPage() {
    return (
        <div className='EvaluationPage'>
            <NavBar title={framework_data.framework_title} />
            <Summary />
            <SectionsList {...framework_data} />
        </div>
    );
}

export default EvaluationPage;
