import React from "react";
import {Divider} from "antd";

/**
 * A simple card that displays informations 
 * @param {object} title to be displayed as the title
 * @param {function} [onClick=()=>{}] optional event to be triggered when you click on the entire infoCard
 * @param {object} children
 */
function InfoCard({title, onClick=()=>{}, children, hideTitle=false}) {
    return (
        <div className={hideTitle? "InfoCard breakWord":"InfoCard clickable breakWord"} onClick={onClick}>
            {hideTitle? null :             
                <div className="elementTitle">
                    {title}
                </div>}
            <Divider/>
            {children}
        </div>
    )
}

export default InfoCard;