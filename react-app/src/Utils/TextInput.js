import React, {useState, useRef} from 'react';
import Button3D from './Button3D'

/**
 * Input field for 1 line of text, with a button
 * @param text: placeholder
 * @param onSave(text): triggers when the save button is pressed
 * @ignore children
 */
function TextInput({text, onSave=f=>f}) {
    const [getText, setText] = useState(text);
    const [getActive, setActive] = useState(false);
    const text_input = useRef(null);

    const toggleActive = (event) => {
        event.preventDefault();
        if (getActive) {
            onSave(getText);
            setActive(false);
        } else {
            setActive(true);
            //TODO, set focus seems to have no effect.
            text_input.current.focus();
        }
    }

    return (
        <div className='TextInput'>
            <input
                ref={text_input}
                type='text'
                value={getText}
                onChange={(event) => {
                    setText(event.target.value);
                }}
                disabled={!getActive}
            />
            <div className="right">
            <Button3D
                on={getActive}
                onClick={toggleActive}
                on_text='save'
                off_text='edit'
            />
            </div>
        </div>
    );
}

export default TextInput;