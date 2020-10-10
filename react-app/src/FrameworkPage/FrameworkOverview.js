import React, {useEffect, useState} from "react";
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput";
import BigButton from "../Utils/BigButton";
import StatusSwitch from "../Utils/StatusSwitch";
import Reminder from "../Utils/Reminder";
import {useHistory} from "react-router-dom";
import {
    RightOutlined,
    DownOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    PlusOutlined,
} from "@ant-design/icons";
/*
(Route from FrameworkPage)
Framework Overview Page
    |-- Status
        |--  Active Switch
        |--  Published Switch
    |-- SectionList
            |-- Section
                    |-- Question (rout to Question Page)
                    |-- Add Question
            |-- Add Section
    |-- Footer
*/

/**
 * FrameworkOverview Page that lists all sections and questions related to the framework
 * @param {int} history.location.state.framework_id
 * */
function FrameworkOverview({history}) {
    const {framework_id} = history.location.state;
    const [framework_data, setFramework] = useState(null);
    const [activeStatus, setActiveStatus] = useState(0);
    const [published, setPublished] = useState(0);
    const [frameworkTitle, setFrameworkTitle] = useState("");
    const [sections, setSections] = useState([]);
    const [expandedSections, setExpandedSections] = useState([]);

    function initializeFramework(data) {
        console.log(data);
        setFrameworkTitle(data.framework_title);
        setActiveStatus(data.framework_active_status);
        setSections(data.sections);
        setPublished(data.framework_finalised);
        setFramework(data);
        if (history.location.state.session === undefined) {
            var state = history.location.state;
            state.session = [];
            history.replace({...history.location, state});
        }
        setExpandedSections(history.location.state.session);
    }

    useEffect(() => {
        fetch(`http://localhost:3001/framework?framework_id=${framework_id}`)
            .then((response) => response.json())
            .then((data) => {
                initializeFramework(data);
            })
            .catch(console.err);
    }, [framework_id]);

    if (framework_data === null || expandedSections === []) {
        return <h1>Loading...</h1>;
    }
    //Add section to framework, called from SectionList
    const addSection = () => {
        const url = `http://localhost:3001/framework/section/new?framework_id=${framework_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSections((prevState) => [
                    ...prevState,
                    {...data, questions: []},
                ]);
            })
            .catch(console.err);
    };
    //Add question with given section_id, called from EditableSection
    const addQuestion = (section_id) => {
        const url = `http://localhost:3001/framework/section/question/new?section_id=${section_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSections((prevState) =>
                    prevState.map((section) => {
                        if (section.section_id === section_id) {
                            return {
                                section_id: section.section_id,
                                section_title: section.section_title,
                                questions: [...section.questions, data],
                            };
                        }
                        return section;
                    })
                );
            })
            .catch(console.err);
    };

    const setActive = () => {
        const url = `http://localhost:3001/framework/activestatus/update?framework_id=${framework_data.framework_id}`;
        const newActiveStatus = {
            framework_active_status: 1 - framework_data.framework_active_status,
        };
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newActiveStatus),
            method: "POST",
        };
        // Had to remove the .then(data=>data.text()) because it caused an error in testing.
        fetch(url, param).catch(console.err);
        setActiveStatus((prevState) => {
            return 1 - prevState;
        });
    };

    const handlePublish = () => {
        const url = `http://localhost:3001/framework/finalisedstatus/update?framework_id=${framework_data.framework_id}`;
        const newPublishStatus = {
            framework_finalised_status: 1,
        };
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPublishStatus),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((response) => {
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    setPublished(1);
                }
            })
            .catch(console.err);
    };

    const handleNewVersion = () => {
        const url = `http://localhost:3001/framework/version?framework_id=${framework_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // history.replace({
                //     pathname: "/framework_overview",
                //     state: {
                //         framework_id: data.framework_id
                //     },
                // })
                history.goBack();
            })
            .catch(console.err);
    };

    const postTitle = (framework_id) => (text) => {
        const url = `http://localhost:3001/framework/update?framework_id=${framework_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({framework_title: text}),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((response) => {
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    setFrameworkTitle(text);
                }
            })
            .catch(console.err);
    };
    const saveExpand = (section_id) => {
        var state = history.location.state;
        if (state.session === undefined) {
            state.session = [];
        }
        if (!state.session.includes(section_id)) {
            state.session.push(section_id);
        }
        setExpandedSections(state.session);
        history.replace({...history.location, state});
    };
    const deletExpand = (section_id) => {
        //alert("Unregister" + section_id)

        var state = history.location.state;
        if (state.session === undefined) {
            state.session = [];
     }
        const index = state.session.indexOf(section_id);
        if (index > -1) {
            state.session.splice(index, 1);
        }
        setExpandedSections(state.session);
        history.replace({...history.location, state});
    };

    const checkExpand = (section_id) => {
        return expandedSections.includes(section_id);
    };
    return (
        <div className='flex_container '>
            <NavBar>
                <TextInput
                    text={frameworkTitle}
                    title={"Framework Title"}
                    onSave={postTitle(framework_id)}
                    disabled={published}
                />
            </NavBar>

            <div className='content scrollable'>
                {published ? (
                    <Reminder is_hidden={published}>
                        <span>
                            This framework cannot be edited as it has been
                            published, click "Save as New" to generate a new
                            copy
                        </span>
                    </Reminder>
                ) : null}
                <div className='section_header'>Status</div>
                <StatusSwitch
                    handleChange={setActive}
                    value={activeStatus}
                    switchName='Active'
                    disabled={!published}
                />
                <SectionList
                    addSection={addSection}
                    addQuestion={addQuestion}
                    sections={sections}
                    published={published}
                    registerExpand={saveExpand}
                    registerUnexpand={deletExpand}
                    checkExpand={checkExpand}
                    expandedSections={expandedSections}
                />
            </div>
            <div className='footer'>
                <ButtomButton
                    hasPublished={published}
                    isActive={activeStatus}
                    handlePublish={handlePublish}
                    handleNewVersion={handleNewVersion}
                />
            </div>
        </div>
    );
}

function SectionList(props) {
    return (
        <div className='content'>
            <div className='section_header'>Sections</div>
            <div>
                {props.sections.map((section, i) => (
                    <EditableSection
                        addQuestion={props.addQuestion}
                        section_index={i}
                        section={section}
                        published={props.published}
                        defaultExpand={props.checkExpand(section.section_id)}
                        registerExpand={props.registerExpand}
                        registerUnexpand={props.registerUnexpand}
                        expandedSections={props.expandedSections}
                        key={i}
                    />
                ))}
            </div>
            {props.published ? null : (
                <div
                    className='editable_section clickable new_section'
                    onClick={props.addSection}
                >
                    Add Section
                    <PlusOutlined
                        onClick={props.handleClick}
                        className='right_button add_button'
                    />
                </div>
            )}
        </div>
    );
}

function EditableSection(props) {
    // track expand or not

    const [getExpand, setExpand] = useState(false);
    const [getActive, setActive] = useState(false);
    const [getText, setText] = useState(props.section.section_title);
    const [getLastText, setLastText] = useState(props.section.section_title);
    // TO expand a section to see questions
    const toggleExpand = (event) => {
        event.preventDefault();
        if (!getExpand) {
            props.registerExpand(props.section.section_id);
        } else {
            props.registerUnexpand(props.section.section_id);
        }
        setExpand(!getExpand);
    };

    useEffect(() => setExpand(props.defaultExpand), [props.defaultExpand]);
    // Save the changes to section title
    const toggleSave = (event) => {
        event.preventDefault();
        setActive(!getActive);
        const url = `http://localhost:3001/framework/section/update?section_id=${props.section.section_id}`;
        const param = {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({section_title: getText}),
            method: "POST",
        };
        fetch(url, param)
            .then((data) => data.text())
            .then((response) => {
                if (
                    response === "The call to the SQL database was successful."
                ) {
                    // Document current text to prevent roll back
                    if (getActive === true) {
                        setLastText(getText);
                    }
                }
            })
            .catch(console.err);
    };
    //Called when user click "x" while editing section title
    const toggleRollBack = (event) => {
        event.preventDefault();
        setActive(!getActive);
        setText(getLastText);
    };
    //Handle change of the value
    const handleChange = (event) => {
        const {value} = event.target;
        setText(value);
    };
    //input style for section title
    const inputStyle = {
        backgroundColor: "transparent",
        width: getText.length > 10 ? (getText.length + 1) * 8 + "px" : "88px",
        paddingLeft: "5px",
        border: getActive ? "1px black solid" : "0px black solid",
        widthMin: "30px",
    };

    return (
        <div>
            <div className='editable_section'>
                {/* Can be used to question edit page */}
                <div
                    className='section_input clickable'
                    onClick={getActive ? null : toggleExpand}
                >
                    <span>Section {props.section_index + 1}</span>
                    {getActive ? (
                        <input
                            value={getText}
                            disabled={!getActive}
                            style={inputStyle}
                            onChange={handleChange}
                        />
                    ) : (
                        <span> {getText} </span>
                    )}
                </div>
                {/* Button to change the title */}
                <div className='section_input_button'>
                    {props.published ? null : getActive ? (
                        <span>
                            <CheckOutlined
                                className='saveOrNot'
                                onClick={toggleSave}
                            />
                            <CloseOutlined
                                className='saveOrNot'
                                onClick={toggleRollBack}
                            />
                        </span>
                    ) : (
                        <EditOutlined onClick={toggleSave} />
                    )}
                </div>
                {/* right button to fold the section */}
                <div className='left_button'>
                    {getExpand ? (
                        <DownOutlined onClick={toggleExpand} />
                    ) : (
                        <RightOutlined onClick={toggleExpand} />
                    )}
                </div>
            </div>

            <ul className={getExpand ? "question_list" : null}>
                {getExpand ? (
                    <div>
                        {props.section.questions.map((data, i) => (
                            <Question
                                section_index={props.section_index}
                                question_index={i}
                                question={data}
                                key={i}
                                published={props.published}
                                expandedSections={props.expandedSections}
                            />
                        ))}

                        {props.published ? null : (
                            <div
                                className='clickable new_question'
                                onClick={() =>
                                    props.addQuestion(props.section.section_id)
                                }
                            >
                                Add Question
                                <PlusOutlined className='right_button add_button' />
                            </div>
                        )}
                    </div>
                ) : null}
            </ul>
        </div>
    );
}

function Question(props) {
    const history = useHistory();

    const handleClick = () => {
        // alert(props.expandedSections)
        history.push({
            pathname: "./framework_question",
            state: {
                question_id: props.question.question_id,
                published: props.published,
            },
        });
    };
    return (
        <div className='Question clickable' onClick={handleClick}>
            {props.section_index + 1}.{props.question_index + 1}{" "}
            {props.question.question_title}
            <RightOutlined className='right_button' />
        </div>
    );
}

function ButtomButton({hasPublished, handlePublish, handleNewVersion}) {
    return (
        <div>
            {hasPublished ? (
                <BigButton onClick={handleNewVersion}>
                    <div>Save As New</div>
                </BigButton>
            ) : (
                <BigButton onClick={handlePublish}>
                    Finalize
                </BigButton>
            )}
        </div>
    );
}

export default FrameworkOverview;
