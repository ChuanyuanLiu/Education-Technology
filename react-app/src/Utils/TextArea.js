import React, {useState} from "react";
import Button3D from "./Button3D";
import { EditOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons"


/**
 * Display a header with title and a button to toggle edit on a large text area
 * Initially the textarea is disabled
 * - all input elements will have name assigned as title
 * - the header is associated with the text area
 * @param {string} [title="TextArea"]
 * @param {string} [text=""] - the placeholder text
 * @param {Function} [onSave=(text)=>{}] - triggers when the button is released, and supply the updated text
 * @param {boolean} [disabled=false] - hide button if disabled
 * @ignore children - Will not show child elements
 * */
function TextArea({
    title = "TextArea",
    text = "",
    disabled = false,
    onSave = (f) => f,
}) {
    // track changes to text
    const [getText, setText] = useState(text);
    const [getPrevText, setPrevText] = useState(text);
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
            setPrevText(getText);
        }
        setActive(!getActive);
    };

    const toggleRollBack = () => {
        if(getActive){
            setText(getPrevText)
        }
        setActive(!getActive)
    }
    return (
            <form className='TextArea'>
            <div className='section_header'>
                <label name={title} htmlFor={title}>
                    {title}
                </label>
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
            <div className="container">
                <textarea
                    name={title}
                    id={title}
                    disabled={!getActive}
                    onChange={appendText}
                    value={getText}
                />
            </div>
                {/* <div className='hidden'>{text_to_html(getText)}</div> */}

        </form>
        
    );
}

// Convert text to html by converting \n to <br/>
function text_to_html(text) {
    var html = [];
    var i = 0;
    for (var line of text.split("\n")) {
        html.push(<span key={i * 2}>{line}</span>);
        html.push(<br key={i * 2 + 1} />);
        i += 1;
    }
    return html;
}

export default TextArea;
