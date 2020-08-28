import { Form, Input, Button} from 'antd';
import React from "react"
import "./Login.css"
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";



function Login(){
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const history = useHistory();
    function onClickHandle(){
        history.push('/')
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
            
                <Form.Item>
                    <Button onClick={onClickHandle}
                            type="primary" size="large" htmlType="submit"
                            shape="round" block
                            >
                    Login
                    </Button>
                </Form.Item>
                </Form>
                </div>
            </div>)
}
export default Login