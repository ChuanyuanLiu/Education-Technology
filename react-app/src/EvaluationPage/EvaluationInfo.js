import React from "react";
import "./EvaluationPage.css";
import {useHistory} from "react-router-dom";
import {CheckOutlined, UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper"
function EvaluationInfo(props) {
    const history = useHistory();
    // This function takes in evaluation_id and returns  a function
    // that can point to a specific evaluation
    const handleClick = ({evaluation_id, framework_id}) => () => {
        history.push({
            pathname: "/evaluation_overview",
            state: {
                evaluation_id,
                framework_id,
            },
        });
    };
    return (
        <div className='elementInfo clickable' onClick={handleClick(props.item)}>
            <div className='elementTitle'>{props.item.evaluation_title}</div>
            <div className='elementStatus'>
                {props.item.evaluation_completed ? <CheckOutlined /> : null}
                {props.item.evaluation_completed ? "Completed" : "Active"}
            </div>
            <div className='elementAuthor'>
                <UserOutlined style={{fontSize: "20px"}} />{" "}
                {props.item.evaluation_author}
            </div>
            <div>
                <div className='elementOrigin'>{props.item.framework_title}</div>
                <div className='elementDate'>
                    {resolveTime(props.item.evaluation_modified_time)}
                </div>
            </div>
        </div>
    );
}
export default EvaluationInfo;
