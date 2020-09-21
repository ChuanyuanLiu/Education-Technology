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
            .then((data) => setQuestion(data[0]))
            .catch(console.error);
    }, [question_id]);

    // POST the entire rating_list
    const post_request = (question_id, rating_list, field_name) => (text) => {
        var new_rating = {};
        for (var rating of rating_list) {
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
        fetch(url, param)
            .then((data) => data.text())
            .then(console.log)
            .catch(console.err);
    };

    if (questionData == null) return <h1>Loading</h1>;

    // Preprocessing because the backend doesn't supply adequate information;
    const NUM_RATING = 5;
    const RATING_TITLE = [
        "Not Applicable",
        "Below Basic",
        "Basic",
        "Adequate",
        "Exceptional",
    ];
    var rating_list = [];
    for (var i = 1; i <= NUM_RATING; i++) {
        // field name corresponds to the field name in database
        const field_name = `rate_${i}_criterion`;
        rating_list.push({
            field_name,
            rate_title: RATING_TITLE[i - 1],
            rate_criterion: questionData[field_name],
        });
    }

    const {question_title} = questionData;
    return (
        <div className='FrameworkQuestionPage flex_container'>
            <div className='header'>
                <NavBar>{question_title}</NavBar>
            </div>
            <div className='content scrollable'>
                <RatingList
                    question_id={question_id}
                    rating_list={rating_list}
                    post_request={post_request}
                />
            </div>
        </div>
    );
}

function RatingList({question_id, rating_list, post_request}) {
    return (
        <div className='RatingList'>
            {rating_list.map((rating, i) => {
                const {rate_title, rate_criterion, field_name} = rating;
                return (
                    <TextArea
                        title={rate_title}
                        text={rate_criterion}
                        key={i}
                        onSave={post_request(
                            question_id,
                            rating_list,
                            field_name
                        )}
                    />
                );
            })}
        </div>
    );
}

export default FrameworkQuestionPage;
