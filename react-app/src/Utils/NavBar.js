import React, {useState, useEffect}from "react";
import {useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutOutlined } from "@ant-design/icons";

/**
 * A navigation bar with a go back button 
 * @param children: child elements
 */
function NavBar({children, disableBack} ) {
    const history = useHistory();
    const { logout } = useAuth0();
    const [canGoback, setCanGoBack] = useState(true)
    // console.log(history.length);
    useEffect(() =>{
        if(disableBack === "true"){
            setCanGoBack(false);
        }
    }, [])
    return (
        <div className='NavBar'>
            {canGoback?
                <span className="left clickable" id="backButton" onClick={()=> {
                    if (window.location.pathname !== "/home_page") {
                        history.goBack();
                    }
                }}>
                {"<"}
                </span>
                : null
            }
            <span className="right clickable" onClick={()=>logout({
                returnTo: window.location.origin
            })}>
                <LogoutOutlined/>
            </span>
            <div className="middle">{children}</div>
        </div>
    );
}

export default NavBar;
