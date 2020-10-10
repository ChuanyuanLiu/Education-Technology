import React from "react";
import {useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutOutlined } from "@ant-design/icons";

/**
 * A navigation bar with a go back button 
 * @param children: child elements
 */
function NavBar({children}) {
    const history = useHistory();
    const { logout } = useAuth0();
    console.log(history.length);
    return (
        <div className='NavBar'>
            <span className="left clickable" onClick={()=> {
                if (window.location.pathname === "/home_page") {
                    history.block("Logout to return to login page.");
                } else {
                    history.goBack();
                }
            }}>
            {"<"}
            </span>
            {children}
            <span className="right clickable" onClick={()=>logout({
                returnTo: window.location.origin
            })}>
            <LogoutOutlined/>
            </span>
        </div>
    );
}

export default NavBar;
