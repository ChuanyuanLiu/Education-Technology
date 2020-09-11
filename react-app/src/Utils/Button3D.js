import React from "react";

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