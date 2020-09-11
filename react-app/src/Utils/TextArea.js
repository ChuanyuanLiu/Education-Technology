import React, {useState} from "react";
import Button3D from "./Button3D";

/** 
 * Display and edit a large text area
 * @param title  
 * @param text: the placeholder text 
 * */ 
function TextArea({title = "TextArea", text = ""}) {
    // track changes to text
    const [getText, setText] = useState(text);
    const appendText = (event) => {
        setText(event.target.value);
    };
    // tracks if the interface is active for editing
    const [getActive, setActive] = useState(false);
    const toggleActive = (event) => {
        event.preventDefault();
        setActive(!getActive);
    };

    return (
        <form>
            <div className='section_header'>
                {title}
                <div className='right'>
                    <Button3D
                        on={getActive}
                        callBack={toggleActive}
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