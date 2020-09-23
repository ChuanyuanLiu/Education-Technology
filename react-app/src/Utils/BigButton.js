import React from "react"

/**
 * A big centered blue button
 * @param {string} [name=""] the name of the button 
 * @param {function} [onClick=()=>{}] event that triggers up clicking
 * @param children child elements to be rendered
 */
function BigButton({name="", onClick=()=>{}, children}){
    return (
        <button id="big_button" name={name} onClick={onClick}>{children}</button>
    )
}

export default BigButton