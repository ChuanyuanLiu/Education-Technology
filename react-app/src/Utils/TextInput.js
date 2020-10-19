import React, {useState, useRef} from 'react';
import { EditOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons"

/**
 * Input field for 1 line of text, with a button
 * @param text: placeholder
 * @param onSave(text): triggers when the save button is pressed
 * @ignore children
 */
function TextInput({disabled, textAlign, text, onSave=f=>f}) {
    const [getText, setText] = useState(text);
    const [getActive, setActive] = useState(false);
    const text_input = useRef(null);
    const [prevText, setPrevText] = useState(text);

    const toggleActive = (event) => {
        event.preventDefault();
        if (getActive) {
            onSave(getText);
            setActive(false);
            setPrevText(getText);
        } else {
            setActive(true);
            //TODO, set focus seems to have no effect.
            text_input.current.focus();
        }
    }
    const toggleRollBack = (event) => {
        event.preventDefault();
        if (getActive) {
            setActive(false);
            setText(prevText);
        } 
    }
    const inputStyle={
        backgroundColor: "transparent",
        width: (getText.length + 1)*11 + 'px',
        paddingLeft: "5px",
        border: getActive? "1px white solid":"0px white solid",
        widthMin: "30px"
    }
    return (
        <div>
            <input
                style={inputStyle}
                ref={text_input}
                type='text'
                value={getText}
                onChange={(event) => {
                    setText(event.target.value);
                }}
                disabled={!getActive}
            />
            <div className="section_input_button">
                {disabled? null :
                    getActive? 
                        <span >                                        
                            <CheckOutlined className="saveOrNot" onClick={toggleActive}/> 
                            <CloseOutlined className="saveOrNot" onClick={toggleRollBack}/>
                        </span>
                        :
                        <EditOutlined onClick={toggleActive}/>}
            </div>
        </div>
    );
}

export default TextInput;
