import React, {useState, useEffect} from "react";
import NavBar from "../Utils/NavBar";
import TextArea from "../Utils/TextArea"
import Button3D from "../Utils/Button3D"
import {useHistory} from "react-router-dom";
/*
(Route from EvaluationInfo)
Evaluation Overview Page
    |-- NavBar
    |-- Summary
    |-- SectionList
            |-- Section
                    |-- Question (rout to questionContainer)
*/

// Entry point for the Evaluation Overview Page
function EvaluationOverviewPage({history}) {
    const {evaluation_id, framework_id} = history.location.state;
    const [evaluation_data, setEvaluation] = useState(null);

    console.log(evaluation_id, framework_id);

    // fetch data every time evaluation or framework ID changes
    useEffect(() => {
        fetch(
            `http://localhost:3001/evaluation?evaluation_id=${evaluation_id}&framework_id=${framework_id}`
        )
            .then((response) => response.json())
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

    return (
        <div className='EvaluationPage'>
            <NavBar>
                {evaluation_data.evaluation_title} 
                <Button3D className="right" on="true" onClick={()=>{}} on_text="save" off_text="edit"/>
            </NavBar>
            <TextArea
                title='Summary'
                text={evaluation_data.evaluation_summary}
            />
            <SectionsList evaluation_id={evaluation_id} {...evaluation_data} />
        </div>
    );
}

// Display a list of sections
function SectionsList({evaluation_id, sections}) {
    return (
        <>
            <div className='section_header'>Sections</div>
            {sections.map((section, i) => (
                <Section
                    key={i}
                    evaluation_id={evaluation_id}
                    section_index={i}
                    {...section}
                />
            ))}
        </>
    );
}

// Display a list of questions
function Section({evaluation_id, section_title, section_index, questions}) {
    // track expand or not
    const [getExpand, setExpand] = useState(false);
    const toggleExpand = (event) => {
        event.preventDefault();
        setExpand(!getExpand);
    };

    return (
        <>
            <div
                onClick={toggleExpand}
                className={"sub_header clickable " + (getExpand ? "on" : "")}
            >
                {`Section ${section_index + 1} ${section_title}`}
                <div className='right'>
                    <Button3D
                        on={getExpand}
                        onClick={toggleExpand}
                        on_text='collapse'
                        off_text='expand'
                    />
                </div>
            </div>
            <ul>
                {getExpand
                    ? questions.map((question, i) => (
                          <Question
                              {...question}
                              evaluation_id={evaluation_id}
                              section_index={section_index}
                              question_index={i}
                              key={i}
                          />
                      ))
                    : null}
            </ul>
        </>
    );
}

// Show a question and rout to the question page upon click
function Question({
    evaluation_id,
    question_id,
    section_index,
    question_index,
    question_title,
}) {
    const history = useHistory();
    function handleClick() {
        history.push({
            pathname: "./question",
            state: {
                evaluation_id,
                question_id,
            },
        });
    }
    return (
        <li onClick={handleClick} className='clickable'>
            {`${section_index + 1}.${question_index + 1} ${question_title}`}
        </li>
    );
}

export default EvaluationOverviewPage;
