import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper";

/**
 * Route from FrameworkSelect or FrameworkPage
 * A card that display following information of a framework
 * @param {number} framework_id
 * @param {string} framework_title
 * @param {string} framework_author
 * @param {string} framework_creation_time
 * @param {number} framework_active_status 1 indicates active, 0 indicates not active
 * @param {number} framework_finalised 1 indicates finalised, 0 indicates not finalised
 * @param {function} handelClick(framework_id) gets trigger upon clicking the info card
 */
function FrameworkInfo({
    framework_id,
    framework_title,
    framework_author,
    framework_creation_time,
    framework_active_status,
    framework_finalised,
    handleClick
}) {
    return (
        <div
            className='elementInfo'
            onClick={() => handleClick(framework_id)}
        >
            <div className='elementTitle'>{framework_title}</div>
            <div className='elementStatus'>
                {framework_finalised
                    ? framework_active_status
                        ? "Active"
                        : "Inactive"
                    : "Not Finalized"}
            </div>
            <div className='elementAuthor'>
                <UserOutlined style={{fontSize: "20px"}} /> {framework_author}
            </div>
            <div>
                <div className='elementDate'>
                    {resolveTime(framework_creation_time)}
                </div>
            </div>
        </div>
    );
}

export default FrameworkInfo;
