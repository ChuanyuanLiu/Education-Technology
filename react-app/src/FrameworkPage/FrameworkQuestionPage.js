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

    useEffect(()=>{
        fetch(`http://localhost:3001/framework?question_id=${question_id}`)
        .then(data => data.json())
        .then(data => setQuestion(data[0]))
        .catch(console.error);
    }, [question_id]);

    if (questionData == null) return <h1>Loading</h1>;

    // Preprocessing because the backend doesn't supply adequate information;
    const NUM_RATING = 5;
    const RATING_TITLE = ["Not Applicable", "Below Basic", "Basic", "Adequate", "Exceptional"];
    var rating_list = [];
    for (var i = 1; i <= NUM_RATING; i++) {
        rating_list.push(
            {
                rate_title: RATING_TITLE[i-1],
                rate_criterion: questionData[`rate_${i}_criterion`]
            });
    }
    
    const {question_title} = questionData;
    return(
        <div className="FrameworkQuestionPage flex_container">
            <div className="header">
                <NavBar>{question_title}</NavBar>
            </div>
            <div className="content scrollable">
                <RatingList rating_list={rating_list}/>
            </div>
        </div>
    )
}


function RatingList({rating_list}) {
    return(
        <div className="RatingList">
            {rating_list.map((rating,i)=>{
                const {rate_title, rate_criterion} = rating;
                return <TextArea title={rate_title} text={rate_criterion} key={i}/>
            })}
        </div>
    );
}

export default FrameworkQuestionPage;