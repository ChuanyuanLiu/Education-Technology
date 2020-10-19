import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import TextInput from "../Utils/TextInput";
import NavBar from "../Utils/NavBar";
import StatusSwitch from "../Utils/StatusSwitch";
import TextArea from "../Utils/TextArea";

import "./UserOverview.css";

function UserOverview({history}) {
    const {user_id} = history.location.state;
    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState("");
    const [userActive, setUserActive] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userEmployer, setUserEmployer] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");

    function initialiseUser(data) {
        setUserName(data.name);
        setUserActive(data.user_metadata.active);
        setUserRole(data.role);
        setUserEmail(data.email);
        setUserEmployer(data.user_metadata.employer);
        setUserPhoneNumber(data.user_metadata.contact_number);

        setUserData(data);
    }

    // Send new data to back-end to Auth0
    const updateText = (field, isMetadata) => (text) => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST"
        }
        let status;

        if (isMetadata) {
            param.body = `{"user_metadata":{"${field}": "${text}"}}`;
        } else {
            param.body = `{"${field}": "${text}"}`;
        }

        fetch(`http://localhost:3001/user/update?user_id=${user_id}`, param)
            .then((response) => {
                status = response.status;
                return response.json()
            })
            .then((data) => {
                console.log(data.statusCode/100);
                if (status === 200 && data.statusCode/100 !== 4) {
                    if (field === "name") {
                        setUserName(data.name);
                    } else if (field === "email") {
                        setUserEmail(data.email);
                    } else if (field === "employer") {
                        setUserEmployer(data.user_metadata.employer);
                    } else if (field === "contact_number") {
                        setUserPhoneNumber(data.user_metadata.contact_number);
                    }
                }
            })
            .catch(console.error);
    }

    const toggleActive = () => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            body: `{"user_metadata":{"active": ${!userActive}}}`,
            method: "POST"
        }
        let status;
        
        fetch(`http://localhost:3001/user/update?user_id=${user_id}`, param)
            .then((response) => {
                status = response.status;
                return response.json()
            })
            .then((data) => {
                if (status === 200) {
                    setUserActive(data.user_metadata.active);
                }
            })
            .catch(console.error);
    }

    useEffect(() => {
        let isInit = false;
        fetch(`http://localhost:3001/user/withroles?user_id=${user_id}`)
            .then((response) => response.json())
            .then((data) => {
                if (!isInit) {
                    initialiseUser(data[0]);
                }
            })
            .catch(console.error);
        return () => {isInit = true};
    }, []);

    if (userData == null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex_container'>
            <NavBar>
                <TextInput
                    text={userName}
                    onSave={updateText("name", false)}
                    disabled={userActive}
                />
            </NavBar>

            <div className='content scrollable'>
                <div className='section_header'>Status</div>
                <StatusSwitch
                    handleChange={toggleActive}
                    value={userActive}
                    switchName='Active'
                    disabled={false}
                />
                {/**
                 * TODO: ROLE CHANGE
                 */}
                <TextArea
                    title='Email'
                    text={userEmail}
                    onSave={updateText("email", false)}
                    disabled={userActive}
                />
                <TextArea
                    title='Employer'
                    text={userEmployer}
                    onSave={updateText("employer", true)}
                    disabled={userActive}
                />
                <TextArea
                    title='Phone Number'
                    text={userPhoneNumber}
                    onSave={updateText("contact_number", true)}
                    disabled={userActive}
                />
            </div>
        </div>
    );
}

export default UserOverview;