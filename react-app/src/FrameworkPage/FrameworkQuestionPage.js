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
        const url = `http://localhost:3001/framework/section/question/rate/update?question_id=${question_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(new_rating),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((data) => {console.log("Post request", data)})
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
                    />
                );
            })}
        </div>
    );
}

export default FrameworkQuestionPage;
