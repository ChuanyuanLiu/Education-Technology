import React from "react";

/**
 * A simple footer that is fixed to bottom of screen
 * and contains website information 
 * @param children 
 */
function Footer({children}) {
    return (
        <div id="footer">
        {children}
        <div id="webpage_info">@2020 Budgerigar</div>
        </div>
    )
}

export default Footer;