import React from "react";
import {useHistory} from "react-router-dom";

/**
 * A navigation bar with a go back button 
 * @param children: child elements
 */
function NavBar({children}) {
    const history = useHistory();
    return (
        <div className='NavBar'>
            <span className="left clickable" onClick={()=>history.goBack()}>
            {"<"}
            </span>
            {children}
        </div>
    );
}

export default NavBar;
