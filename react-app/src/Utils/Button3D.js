import React from "react";

function Button3D ({on, onClick, on_text, off_text, className=''}) {
    if (on) {
        return (
            <Button3D className={className}>
            <button onClick={onClick} className='on'>
                {on_text}
            </button>
            </Button3D>
        );
    }
    return (
        <Button3D className={className}>
        <button onClick={onClick} className='off'>
            {off_text}
        </button>
        </Button3D>
    );
};

export default Button3D;