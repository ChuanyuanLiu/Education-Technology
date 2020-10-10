import React from "react";
import {Divider} from "antd";

/**
 * A simple card that displays informations 
 * @param {object} title to be displayed as the title
 * @param {function} [onClick=()=>{}] optional event to be triggered when you click on the entire infoCard
 * @param {object} children
 */
function InfoCard({title, onClick=()=>{}, children}) {
    return (
        <div className="InfoCard clickable breakWord" onClick={onClick}>
            <div className="elementTitle">
                {title}
            </div>
            <Divider/>
            {children}
        </div>
    )
}

export default InfoCard;