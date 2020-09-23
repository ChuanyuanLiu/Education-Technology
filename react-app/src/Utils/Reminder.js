import React, {useState} from "react";
import {WarningOutlined} from '@ant-design/icons';

/**
 * A gentile reminder message that can be removed
 * using a button named reminder
 * @param {string} [text=""] - message to be shown
 * @param {boolean} [is_hidden=false] - whether to show or no
 * @param {object} [children]
 */
function Reminder({text="", is_hidden=false, children}) {
    const [on, setOn] = useState(is_hidden);

    if (!on) return <div className='Reminder'/>;
    
    return (
        <div className='Reminder'>
            <WarningOutlined/>
            {text}
            {children}
            <div className="right">
            <button
                name='reminder'
                onClick={() => {
                    setOn(false);
                }}
            >
                x
            </button>
            </div>
        </div>
    );
}

export default Reminder;