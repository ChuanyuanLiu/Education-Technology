import React, {useEffect, useState} from "react";
import NavBar from "../Utils/NavBar";
import TextArea from "../Utils/TextArea";
import BigButton from "../Utils/BigButton";

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
    const {evaluation_id, question_id, editable} = history.location.state;
    const [question_data, setQuestion] = useState(null);

    //TODO, catch connection reused error on screen
    useEffect(() => {
        fetch(
            `https://${process.env.REACT_APP_DOMAIN}:3001/evaluation?evaluation_id=${evaluation_id}&question_id=${question_id}`
        )
            .then((data) => data.json())
            .then(setQuestion)
            .catch(console.error);
    }, [evaluation_id, question_id]);

    if (question_data == null) return <h1>Loading...</h1>;
    //TODO dynamic url allocation
    const url = `https://${process.env.REACT_APP_DOMAIN}:3001/evaluation/update/response?evaluation_id=${evaluation_id}&question_id=${question_id}`
    const post_request = (url, rate_chosen, comment) => {
        const param = {
            headers : {'Content-Type': "application/json"},
            body : JSON.stringify({
                rate_chosen,
                response_comment: comment
            }),
            method: "POST"
        };
        // console.log(param);
        fetch(url, param)
            .then(data=>data.text())
            .then(data=>console.log(data))
            .catch(error=>console.log(error));
    }
    const post_comment_request = (url, rate_chosen) => (text) => {
        post_request(url, rate_chosen, text);
    }
    const post_rate_request = (url, comment) => (number) => {
        post_request(url, number, comment);
    }
    

    return (
        <div className='QuestionPage flex_container'>
            <div className='header'>
                <NavBar> {question_data.question_title} </NavBar>
            </div>
            <div className='content scrollable'>
                <RateList 
                    {...question_data} 
                    onChange={post_rate_request(url, question_data.response_comment)}
                    editable={editable} 
                />
                <TextArea
                    title='Comment'
                    text={question_data.response_comment}
                    onSave={post_comment_request(url, question_data.rate_chosen)}
                    disabled={!editable}
                />
            </div>
            <div className='footer'>
                <BigButton
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Back
                </BigButton>
            </div>
        </div>
    );
}

function RateList({rates, onChange, rate_chosen, editable}) {
    return (
        <>
            <div className='section_header'>Rating</div>
            <form onChange={!editable? null: (e)=>{onChange(e.target.value)}}>
                {rates.map((rate, i) => (
                    <Rating editable={editable} {...rate} rate_chosen={rate_chosen} key={i} />
                ))}
            </form>
        </>
    );
}

function Rating({rate_number, rate_title, rate_criterion, rate_chosen, editable}) {
    return (
        <>
            <label id="radio_button" className="clickable no_bold">
                <input type='radio' name='rating' value={rate_number} defaultChecked={rate_chosen===rate_number} disabled={!editable}/>
                <span id='rate_title' > {rate_title}</span>
                <div id='rate_criteria'>{rate_criterion}</div>
            </label>
            <br/>
        </>
    );
}

export default QuestionPage;
