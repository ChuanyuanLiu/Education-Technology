import React from "react";
import {useHistory} from "react-router-dom";

/**
 * A navigation bar 
 * @param children: child elements
 */
function NavBar({children}) {
    const history = useHistory();
    return (
        <div className='header'>
            <span className="left clickable back_button" onClick={()=>history.goBack()}>
            {"<"}
            </span>
            {children}
        </div>
    );
}

export default NavBar;
