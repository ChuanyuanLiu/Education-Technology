import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import TextInput from "../Utils/TextInput";
import NavBar from "../Utils/NavBar";
import StatusSwitch from "../Utils/StatusSwitch";
import TextArea from "../Utils/TextArea";
import BigButton from "../Utils/BigButton";
import { useAuth0 } from 'Utils/UseAuth';
import { Select, Popconfirm, Form, Input } from "antd";

import "./UserOverview.css";

/*
(Route from FrameworkPage)
Framework Overview Page
    |-- NavBar
    |-- Form
        |-- Form.Items (Details)
            |-- Select (Role)
    |-- Footer
        |-- Create User
 * UserCreation Page that provides a form to create a new user
 * */
function UserCreation({history}) {
    const [userRole, setUserRole] = useState(null);
    const [userPermission, setUserPermission] = useState(false);
    const [roleList, setRoleList] = useState(null);

    const { Option } = Select;

    function getRole(roles, roleName) {
        for (let i = 0; i < roles.length; i++) {
            let role = roles[i];
            if (roleName === role.name) {
                return role;
            }
        }
    }

    const updateRole = (value) => {
        setUserRole(getRole(roleList, value))
    }

    const togglePermission = () => {
        setUserPermission(!userPermission);
    }

    // Create a new user
    const createUser = (values) => {
        let param = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST"
        }

        let body = {
            connection: "Username-Password-Authentication",
            name: values.name,
            email: values.email,
            password: values.password,
            role: userRole,
            user_metadata: {
                active: true,
                employer: values.employer,
                phone_number: values.contact_number,
                create_report: userPermission
            }
        }
        param.body = JSON.stringify(body);
        
        fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/user/new`, param)
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
        fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/user/roles`)
            .then((response) => response.json())
            .then((data) => {
                setRoleList(data);
                setUserRole(getRole(data, "Educational Leader"));
            })
            .catch(console.error);
        return () => {isInit = true};
    }, []);

    if (userRole == null) {
        return <div>Loading...</div>;
    }

    return (
        <Form
            name="newUserForm"
            onFinish={createUser}
            className='flex_container'
        >
            <NavBar>
                Add New User
            </NavBar>

            <div className='content scrollable'>

                <div className='section_header'>*Name</div>
                <Form.Item
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input a name!',
                    },
                    ]}
                >
                    <Input placeholder="Please input a name"
                            size="medium"/>
                </Form.Item>

                <div className='section_header'>*Email</div>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        type: "email",
                        message: 'Please input a valid email!',
                    },
                    ]}
                >
                    <Input placeholder="Please input an email"
                            size="medium"/>
                </Form.Item>

                <div className='section_header'>*Password</div>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input a password!',
                    },
                    ]}
                >
                    <Input.Password placeholder="Please input a password"
                            size="medium"/>
                </Form.Item>

                <div className='section_header'>Role</div>
                <Form.Item>
                    <Select
                        defaultValue="Educational Leader"
                        style={{width: "100%"}}
                        onSelect={updateRole}
                    >
                        <Option value="Educational Leader">Educational Leader</Option>
                        <Option value="Consultant">Consultant</Option>
                    </Select>
                </Form.Item>


                {userRole != null && userRole.name === "Educational Leader" &&
                    <div className='section_header'>Permissions</div>
                }
                    {userRole != null && userRole.name === "Educational Leader" &&
                        <StatusSwitch
                            handleChange={togglePermission}
                            value={userPermission}
                            switchName='Create Report'
                        />
                    }

                <div className='section_header'>Employer</div>
                <Form.Item
                    name="employer"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input placeholder="Please input an employer"
                            size="medium"/>
                </Form.Item>

                <div className='section_header'>Contact Number</div>
                <Form.Item
                    name="contact_number"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input placeholder="Please input a contact number"
                            size="medium"/>
                </Form.Item>

            </div>

            <div className='footer'>
                <Form.Item>
                    <BigButton>
                        Create
                    </BigButton>
                </Form.Item>
            </div>

        </Form>
    );
}

export default UserCreation;