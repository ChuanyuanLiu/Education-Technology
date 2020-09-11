import React from "react";

/**
 * A 3D looking button
 * @param on: boolean value 
 * @param onClick
 * @param on_text: text to show when button is pressed down
 * @param off_text: text to show when button is released
 * @ignore children:  
 */
function Button3D ({on, onClick, on_text, off_text, className=''}) {
    if (on) {
        return (
            <div className={className}>
            <button onClick={onClick} className='on'>
                {on_text}
            </button>
            </div>
        );
    }
    return (
        <div className={className}>
        <button onClick={onClick} className='off'>
            {off_text}
        </button>
        </div>
    );
};

export default Button3D;