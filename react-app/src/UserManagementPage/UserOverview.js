import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import TextInput from "../Utils/TextInput";
import NavBar from "../Utils/NavBar";
import StatusSwitch from "../Utils/StatusSwitch";
import TextArea from "../Utils/TextArea";
import BigButton from "../Utils/BigButton";
import { useAuth0 } from '@auth0/auth0-react';
import { Select, Popconfirm } from "antd";

import "./UserOverview.css";

/*
(Route from FrameworkPage)
Framework Overview Page
    |-- NavBar
        |--  User Name
    |-- StatusSwitch (Active)
    |-- Select (Role)
    |-- StatusSwitch (Permission)
    |-- TextAreas (Details)
    |-- Footer
        |-- Delete User
 * UserOverview Page that lists the details of a user
 * @param {int} history.location.state.user_id
 * */
function UserOverview({history}) {
    const {user_id} = history.location.state;

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState("");
    const [userActive, setUserActive] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userPassword, setUserPassword] = useState("");
    const [userPermission, setUserPermission] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userEmployer, setUserEmployer] = useState("");
    const [userContactNumber, setUserContactNumber] = useState("");
    const [roleList, setRoleList] = useState(null);

    const { Option } = Select;

    const { user: selfUser, isAuthenticated, isLoading } = useAuth0();

    function initialiseUser(data) {
        setUserName(data.name);
        setUserActive(data.user_metadata.active);
        setUserRole(data.role);
        setUserPermission(data.user_metadata.create_report);
        setUserEmail(data.email);
        setUserEmployer(data.user_metadata.employer);
        setUserContactNumber(data.user_metadata.contact_number);

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
                        setUserContactNumber(data.user_metadata.contact_number);
                    }
                }
            })
            .catch(console.error);
    }

    // Toggle the user's active status
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
                if (status === 200 && data.statusCode/100 !== 4) {
                    setUserActive(data.user_metadata.active);
                }
            })
            .catch(console.error);
    }

    // Toggle the user's active status
    const togglePermission = () => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            body: `{"user_metadata":{"create_report": ${!userPermission}}}`,
            method: "POST"
        }
        let status;
        
        fetch(`http://localhost:3001/user/update?user_id=${user_id}`, param)
            .then((response) => {
                status = response.status;
                return response.json()
            })
            .then((data) => {
                if (status === 200 && data.statusCode/100 !== 4) {
                    setUserPermission(data.user_metadata.create_report);
                }
            })
            .catch(console.error);
    }

    // Change user role
    const handleRoleChange = (value) => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST"
        }
        let newRole;

        // Iterate over roles and find appropriate one
        for (let i = 0; i < roleList.length; i++) {
            newRole = roleList[i];
            if (value === newRole.name) {
                param.body = `{"old_role_id": "${userRole.id}", "new_role_id": "${newRole.id}"}`;
                break;
            }
        }

        fetch(`http://localhost:3001/user/update/role?user_id=${user_id}`, param)
            .then((response) => {
                if (response.status === 200) {
                    console.log(newRole);
                    setUserRole(newRole);
                }
            })
            .catch(console.error);
    }

    // Delete the user and return to user listing
    const deleteUser = () => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        }

        fetch(`http://localhost:3001/user/delete?user_id=${user_id}`, param)
            .then((response) => {
                if (response.status === 200) {
                    console.log("success");
                    history.goBack();
                }
            })
            .catch(console.error);
    }

    useEffect(() => {
        let isInit = false;
        fetch(`http://localhost:3001/user?user_id=${user_id}`)
            .then((response) => response.json())
            .then((data) => {
                if (!isInit) {
                    initialiseUser(data[0]);
                }
            })
            .catch(console.error);
        fetch("http://localhost:3001/user/roles")
            .then((response) => response.json())
            .then((data) => setRoleList(data))
            .catch(console.error);
        return () => {isInit = true};
    }, []);

    if (userData == null | isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex_container'>
            <NavBar>
                <TextInput
                    text={userName}
                    onSave={updateText("name", false)}
                    // onSave={setUserName(text)}
                    disabled={userActive}
                />
            </NavBar>

            <div className='content scrollable'>

                <div className='section_header'>Status</div>
                <StatusSwitch
                    handleChange={toggleActive}
                    value={userActive}
                    switchName='Active'
                    disabled={userRole.name === "Senior Consultant"}
                />
                
                <div className='section_header'>Role</div>
                {userRole.name === "Senior Consultant"
                    ?
                    <Select
                        defaultValue="Senior Consultant"
                        style={{width: "100%"}}
                        disabled
                    >
                    </Select>
                    :
                    <Select
                        defaultValue={userRole.name}
                        style={{width: "100%"}}
                        disabled={userActive}
                        onSelect={handleRoleChange}
                    >
                        <Option value="Consultant">Consultant</Option>
                        <Option value="Educational Leader">Educational Leader</Option>
                    </Select>
                }

                {userRole.name === "Educational Leader" &&
                    <div className='section_header'>Able to create report</div>
                }
                {userRole.name === "Educational Leader" &&
                    <StatusSwitch
                        handleChange={togglePermission}
                        value={userPermission}
                        switchName='Create Report'
                        disabled={userActive}
                    />
                }
                
                <TextArea
                    title='Email'
                    text={userEmail}
                    onSave={updateText("email", false)}
                    disabled={true}
                    short={true}
                />

                <TextArea
                    title='Password'
                    text={""}
                    onSave={updateText("password", false)}
                    disabled={userActive && userRole.name !== "Senior Consultant"}
                    short={true}
                    password={true}
                />

                <TextArea
                    title='Employer'
                    text={userEmployer}
                    onSave={updateText("employer", true)}
                    disabled={userActive && userRole.name !== "Senior Consultant"}
                    short={true}
                />

                <TextArea
                    title='Contact Number'
                    text={userContactNumber}
                    onSave={updateText("contact_number", true)}
                    disabled={userActive && userRole.name !== "Senior Consultant"}
                    short={true}
                />
            </div>

            {!userActive && userRole.name !== "Senior Consultant" &&
                <div className='footer'>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={deleteUser}
                        onCancel={() => console.log("cancel")}
                        okText="Yes"
                        cancelText="No"
                    >
                        <BigButton>
                            Delete
                        </BigButton>
                    </Popconfirm>
                </div> 
            }
        </div>
    );
}

export default UserOverview;