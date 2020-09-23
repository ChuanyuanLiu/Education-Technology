import React, {useState} from "react";
import {WarningOutlined} from "@ant-design/icons";
import Button3D from "./Button3D";

/**
 * A gentile reminder message that can be removed
 * using a button named reminder
 * @param {boolean} [is_hidden=false] - whether to show or no
 * @param {object} [children]
 */
function Reminder({is_hidden = false, children}) {
    const [on, setOn] = useState(is_hidden);
    const button = (
        <Button3D
            className="transparent"
            on={on}
            name='reminder'
            onClick={() => {
                setOn(!on);
            }}
            on_text='hide'
            off_text='show'
        />
    );

    return (
        <div className='Reminder'>
            <WarningOutlined />
            <div className='right'>{button}</div>
            {on ? children : "Reminder"}
        </div>
    );
}

export default Reminder;
