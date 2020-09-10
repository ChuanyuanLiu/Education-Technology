import React from "react"

/**
 * A big centered blue button
 * @param onClick event 
 * @param children elements
 */
function BigButton({onClick, children}){
    return (
        <button id="big_button" onClick={onClick}>{children}</button>
    )
}

export default BigButton