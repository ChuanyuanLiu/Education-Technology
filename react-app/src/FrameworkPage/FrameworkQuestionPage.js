import React, {useEffect, useState} from "react";
import NavBar from "../Utils/NavBar";
import TextArea from "../Utils/TextArea";
import Reminder from "../Utils/Reminder";
import {Divider} from 'antd'

/**
 * Route from Framework Overview Page
 * FrameworkQuestionPage
 *  |-- NavBar
 *  |-- RatingList
 *      |-- Rating
 *          |-- TextArea
 *          |-- TextArea
 */

const PUBLISHED_TRUE = 1;
const PUBLISHED_MESSAGE = "This question can be edited because it belongs to a published framework";

function FrameworkQuestionPage({history}) {
    const {question_id, published} = history.location.state;
    const disabled = published == PUBLISHED_TRUE;

    const [questionData, setQuestion] = useState(null);
    // GET
    useEffect(() => {
        fetch(`http://localhost:3001/framework?question_id=${question_id}`)
            .then((data) => data.json())
            .then((data) => {setQuestion(data); console.log("Get request")})
            .catch(console.error);
    }, [question_id]);

    // POST the entire rates
    // Only update rate criterion of corresponding rate title 
    // Since the API demand rate_1_criterion instead of titles, reformat required
    const post_request = (question_id, rates, rate_title) => (text) => {
        var new_rating = {};
        var i = 1;
        for (var rating of rates) {
            // update only the corresponding rate title
            if (rating.rate_title === rate_title) {
                new_rating[`rate_${i}_criterion`] = text;
            } else {
                new_rating[`rate_${i}_criterion`] = rating.rate_criterion;
            }
            i += 1;
        }
        const url = `http://localhost:3001/framework/section/question/update?question_id=${question_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(new_rating),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((data) => {console.log("Posted rating request", data)})
            .catch(console.err);
    };

    const post_title = (question_id) => (text) => {
        const url = `http://localhost:3001/framework/section/question/update?question_id=${question_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"question_title": text}),
            method: "POST"
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((data) => {console.log("Posted title request", data)})
            .catch(console.err);
    }

    if (questionData == null) return <h1>Loading</h1>;

    const {question_title} = questionData;

     return (
        <div className='FrameworkQuestionPage flex_container'>
            <div className='header'>
                <NavBar>Question Details</NavBar>
                <Reminder text={PUBLISHED_MESSAGE} is_hidden={disabled}/>
            </div>
            <div className='content scrollable'>
                <TextArea
                    title={"Question Title"}
                    text={question_title}
                    onSave={post_title(question_id)}
                    disabled={disabled}
                />
                <Divider/>
                <RatingList
                    post_request={post_request}
                    {...questionData}
                    disabled = {disabled}
                />
            </div>
        </div>
    );
}

function RatingList({question_id, rates, post_request, disabled}) {
    return (
        <div className='RatingList'>
            {rates.map((rating, i) => {
                const {rate_title, rate_criterion} = rating;
                return (
                    <TextArea
                        title={rate_title}
                        text={rate_criterion}
                        key={i}
                        onSave={post_request(
                            question_id,
                            rates,
                            rate_title
                        )}
                        disabled = {disabled}
                    />
                );
            })}
        </div>
    );
}

export default FrameworkQuestionPage;
