import React from "react";

/**
 * A 3D looking button
 * @param on: boolean value 
 * @param {function} [onClick=""] trigged on click
 * @param on_text: text to show when button is pressed down
 * @param off_text: text to show when button is released
 * @param {string} [name=""] the name of the button 
 * @ignore children:  
 */
function Button3D ({on, onClick=()=>{}, on_text, off_text, className='', name=""}) {
    if (on) {
        return (
            <div className={className}>
            <button onClick={onClick} className='on' name={name}>
                {on_text}
            </button>
            </div>
        );
    }
    return (
        <div className={className}>
        <button onClick={onClick} className='off' name={name}>
            {off_text}
        </button>
        </div>
    );
};

export default Button3D;