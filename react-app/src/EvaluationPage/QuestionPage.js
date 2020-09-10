import React, {useEffect, useState} from "react";
import NavBar from "../Utils/NavBar";
import TextArea from "../Utils/TextArea";
import BigButton from "../Utils/BigButton"

/* 
(Route from EvaluationOverviewPage)
Question Page
    |-- NavBar
    |-- Rating List
        |-- Rating
    |-- TextArea
    |-- BigButton
*/

function QuestionPage({history}) {
    const {evaluation_id, question_id} = history.location.state;
    const [question_data, setQuestion] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost:3001/evaluation?evaluation_id=${evaluation_id}&question_id=${question_id}`
        )
            .then((data) => data.json())
            .then(setQuestion)
            .catch(console.error);
    }, [evaluation_id, question_id]);

    if (question_data == null) return <h1>Loading...</h1>;

    return (
        <div className='QuestionPage'>
            <NavBar title={question_data.question_title} />
            <RateList {...question_data} />
            <TextArea title='Comment' text={question_data.response_comment} />
            <BigButton onClick={()=>{history.goBack()}}>
                Save
            </BigButton>
        </div>
    );
}

function RateList({rates}) {
    return (
        <>
            <div className='section_header'>Rating</div>
            <form>
                {rates.map((rate, i) => (
                    <Rating {...rate} key={i} />
                ))}
            </form>
        </>
    );
}

function Rating({rate_id, rate_title, rate_criterion}) {
    return (
        <>
            <label id="radio_button" className="clickable">
                <input type='radio' name='rating' value={rate_id} />
                <span id='rate_title'> {rate_title}</span>
                <div id='rate_criteria'>{rate_criterion}</div>
            </label>
            <br />
        </>
    );
}

export default QuestionPage;
