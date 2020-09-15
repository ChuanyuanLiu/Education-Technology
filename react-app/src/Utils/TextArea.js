import React, {useState} from "react";
import Button3D from "./Button3D";

/** 
 * Display and edit a large text area
 * @param title  
 * @param text: the placeholder text 
 * @param onSave(text): triggers when the button is released, and supply the updated text
 * @ignore children: Will not show child elements
 * */ 
function TextArea({title = "TextArea", text = "", onSave=f=>f}) {
    // track changes to text
    const [getText, setText] = useState(text);
    const appendText = (event) => {
        setText(event.target.value);
    };
    // tracks if the interface is active for editing
    const [getActive, setActive] = useState(false);
    const toggleActive = (event) => {
        event.preventDefault();
        // Save when the button transition from active (save) to edit
        if (getActive) {
            onSave(getText);
        }
        setActive(!getActive);
    };

    return (
        <form className="TextArea">
            <div className='section_header'>
                {title}
                <div className='right'>
                    <Button3D
                        on={getActive}
                        onClick={toggleActive}
                        on_text='save'
                        off_text='edit'
                    />
                </div>
            </div>
            <textarea
                disabled={!getActive}
                onChange={appendText}
                value={getText}
            />
        </form>
    );
}

export default TextArea;