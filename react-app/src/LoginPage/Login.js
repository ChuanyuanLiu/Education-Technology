import { Form, Input} from 'antd';
import React from "react"
import "./Login.css"
import 'antd/dist/antd.css';
import BigButton from "./../Utils/BigButton"
import { useHistory } from "react-router-dom";


function Login(){
    const history = useHistory();
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    function handleClick(){
        history.push('/home_page')

    }
    return (
            <div className="Login">
                <img src={require("./ee_logo.png")} 
                     className="logo" 
                     alt='Logo'/>
                <div className="login_form">
                <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input placeholder="Please enter your username"
                          size="large"/>
                </Form.Item>
            
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password placeholder="Please enter your password"
                                    size="large"/>
                </Form.Item>
            
                <Form.Item className="center">
                    <BigButton onClick={handleClick}>
                    Login
                    </BigButton>
                </Form.Item>
                </Form>
                </div>
            </div>)
}
export default Login