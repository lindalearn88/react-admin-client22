import React, { Component } from 'react';
import "./logins.less";
import logo from '../../assests/images/logo.png';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reLogin } from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom'


export default class Login extends Component {
    formRef = React.createRef();
    handleSubmit = () => {
        this.loginReq();
    }
    loginReq = async (err, value) => {
        if (!err) {
            const values = this.formRef.current.getFieldsValue();
            const { username, password } = values;
            const result = await reLogin(username, password);
            if (result.status === 0) {
                message.success('登录成功');
                const user = result.data;
                memoryUtils.user = user;
                storageUtils.saveUser(user);

                this.props.history.replace('/');
            } else {
                message.error(result.msg);
            }
            console.log(result)
        } else {
            console.log("---value--" + value)
        }
    }
    onFinish = values => {
        console.log(values);
    }
    render() {

        const user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to="/admin"></Redirect>
        }
        return (
            <div className="login">
                <header className="login_header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section className="login_content">
                    <h2>用户登录</h2>
                    <div>
                        <Form name="normal_login" ref={this.formRef} onFinish={this.onFinish} className="login-form" initialValues={{ remember: true, }}  >
                            <Form.Item name="username" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className="login-form-button">Log in </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </section>
            </div>
        )
    }
}
