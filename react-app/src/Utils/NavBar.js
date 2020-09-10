import React from "react";
import "./NavBar.css";
import {useHistory} from "react-router-dom";

function NavBar({title}) {
    const history = useHistory();
    return (
        <div className='header'>
            <div className="left clickable back_button" onClick={()=>history.goBack()}>
            {"<"}
            </div>
            {title}
        </div>
    );
}

export default NavBar;
