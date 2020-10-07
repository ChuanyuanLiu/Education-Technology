import React from "react";
import {Divider} from "antd";

/**
 * A simple card that displays informations 
 * @param {object} title to be displayed as the title
 * @param {object} leftCotent to be displayed on the left side
 * @param {object} rightCotent to be displayed on the right side
 * @param {function} [onClick=()=>{}] optional event to be triggered when you click on the entire infoCard
 */
function InfoCard({title, leftContent, rightContent, onClick=()=>{}}) {
    return (
        <div className="InfoCard clickable breakWord" onClick={onClick}>
            <div className="elementTitle">
                {title}
            </div>
            <Divider/>
            <div className="leftContent">
                {leftContent}
            </div>
            <div className="rightContent">
                {rightContent}
            </div>
        </div>
    )
}

export default InfoCard;