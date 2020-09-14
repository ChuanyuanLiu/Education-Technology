import React, {useState} from "react"
import Button3D from "./Button3D"
/**
 * Input field for 1 line of text, with a button
 * @ignore children
 * @param text: placeholder
 */
function TextInput({text}) {
    const [getText, setText] = useState(text);
    const [getActive, setActive] = useState(false);

    return (
        <div className='TextInput'>
            <input
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
                onClick={() => setActive(!getActive)}
                on_text='save'
                off_text='edit'
            />
            </div>
        </div>
    );
}
export default TextInput
