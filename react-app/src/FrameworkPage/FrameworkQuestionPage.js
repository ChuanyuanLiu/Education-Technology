import React, {useEffect, useState} from "react";
import NavBar from "../Utils/NavBar";
import TextArea from "../Utils/TextArea";

/**
 * Route from Framework Overview Page
 * FrameworkQuestionPage
 *  |-- NavBar
 *  |-- RatingList
 *      |-- Rating
 *          |-- TextArea
 *          |-- TextArea
 */

function FrameworkQuestionPage({history}) {
    const {question_id} = history.location.state;

    const [questionData, setQuestion] = useState(null);

    // GET
    useEffect(() => {
        fetch(`http://localhost:3001/framework?question_id=${question_id}`)
            .then((data) => data.json())
            .then(setQuestion)
            .catch(console.error);
    }, [question_id]);

    // POST the entire rates
    const post_request = (question_id, rates, field_name) => (text) => {
        var new_rating = {};
        for (const rating of rates) {
            if (rating.field_name === field_name) {
                new_rating[rating.field_name] = text;
            } else {
                new_rating[rating.field_name] = rating.rate_criterion;
            }
        }
        const url = `http://localhost:3001/framework/section/question/rate/update?question_id=${question_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(new_rating),
            method: "POST",
        };
        console.log(param);
        fetch(url, param)
            .then((data) => data.text())
            .then(console.log)
            .catch(console.err);
    };

    if (questionData == null) return <h1>Loading</h1>;

    const {question_title} = questionData;
    return (
        <div className='FrameworkQuestionPage flex_container'>
            <div className='header'>
                <NavBar>{question_title}</NavBar>
            </div>
            <div className='content scrollable'>
                <RatingList
                    post_request={post_request}
                    {...questionData}
                />
            </div>
        </div>
    );
}

function RatingList({question_id, rates, post_request}) {
    return (
        <div className='RatingList'>
            {rates.map((rating, i) => {
                const {rate_title, rate_criterion, field_name} = rating;
                return (
                    <TextArea
                        title={rate_title}
                        text={rate_criterion}
                        key={i}
                        onSave={post_request(
                            question_id,
                            rates,
                            field_name
                        )}
                    />
                );
            })}
        </div>
    );
}

export default FrameworkQuestionPage;
