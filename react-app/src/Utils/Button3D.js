import React from "react";

/**
 * A 3D looking button
 * @param on: boolean value 
 * @param {function} [onClick=""] trigged on click
 * @param on_text: text to show when button is pressed down
 * @param off_text: text to show when button is released
 * @param className: className of the button
 * @param {string} [name=""] the name of the button 
 * @ignore children:  
 */
function Button3D ({on, onClick=()=>{}, on_text, off_text, className='', name=""}) {
    if (on) {
        return (
            <button onClick={onClick} className={'on '+className} name={name}>
                {on_text}
            </button>
        );
    }
    return (
        <button onClick={onClick} className={'off '+className} name={name}>
            {off_text}
        </button>
    );
};

export default Button3D;