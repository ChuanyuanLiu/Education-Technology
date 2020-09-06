import React, {useState, useEffect} from "react";
import NavBar from "../Utils/NavBar";
import "./EvaluationOverview.css";
import framework_data from "./framework.json";
import {useHistory} from "react-router-dom";
/*
Evaluation Page Layout
|-- NavBar
|-- Summary
|-- SectionList
        |-- Section
                |-- Question
*/

function Summary({summary = ""}) {
    // track changes to summary
    const [getSummary, setSummary] = useState(summary);
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
function Question({section_id, question_id, question_title}) {
    const history = useHistory();
    function handleClick() {
        history.push("./question");
    }
    return (
        <li onClick={handleClick}>
        {`${section_id}.${question_id} ${question_title}`}</li>
    );
}

// data is a list of question objects each contains
// Question_Title, Question_ID
function Section({section_title, section_id, questions}) {
    // track expand or not
    const [getExpand, setExpand] = useState(false);
    const toggleExpand = (event) => {
        event.preventDefault();
        setExpand(!getExpand);
    };

    return (
        <>
            <div className='sub_header'>
                {`Section ${section_id} ${section_title}`}
                <button className='right' onClick={toggleExpand}>
                    {getExpand ? "collapse" : "expand"}
                </button>
            </div>
            <ul>
                {getExpand
                    ? questions.map((question, i) => (
                          <Question
                              {...question}
                              section_id = {section_id}
                              key={i}
                          />
                      ))
                    : null}
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
            {sections.map((section, i) => (
                <Section key={i} {...section} />
            ))}
        </>
    );
}

function EvaluationOverviewPage({history}) {
    // Data is stored in history.location that is controlled by useHistory Hook
    // TODO: data does not persist after refreshing of page, currently default to 1
    const {evaluation_id = 1, framework_id = 1} = history.location;
    const [evaluation_data, setEvaluation] = useState(null);

    // fetch data every time evaluation or framework ID changes
    useEffect(() => {
        fetch(
            `http://localhost:3001/evaluation?evaluation_id=${evaluation_id}&framework_id=${framework_id}`
        )
            .then(response => response.json())
            .then(setEvaluation)
            .catch(console.error);
    }, [evaluation_id, framework_id]);

    if (evaluation_id == null || framework_id == null) {
        return (
            <div className='EvaluationPage'>
                <NavBar title={"Invalid Evaluation"} />
                <h1>
                    This page does not exist, please try accessing another
                    evaluation
                </h1>
            </div>
        );
    }

    if (evaluation_data == null) {
        return <h1>Loading...</h1>;
    }

    console.log(evaluation_data);
    return (
        <div className='EvaluationPage'>
            <NavBar title={evaluation_data.evaluation_title} />
            <Summary summary={evaluation_data.evaluation_summary}/>
            <SectionsList {...evaluation_data} />
        </div>
    );
}

export default EvaluationOverviewPage;
