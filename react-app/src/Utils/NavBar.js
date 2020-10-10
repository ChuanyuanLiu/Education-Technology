import React from "react";
import {useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * A navigation bar with a go back button 
 * @param children: child elements
 */
function NavBar({children}) {
    const history = useHistory();
    const { logout } = useAuth0();
    return (
        <div className='NavBar'>
            <span className="left clickable" onClick={()=>history.goBack()}>
            {"<"}
            </span>
            {children}
            <span className="right clickable" onClick={()=>logout({
                returnTo: window.location.origin
            })}>
            {"Log out"}
            </span>
        </div>
    );
}

export default NavBar;
