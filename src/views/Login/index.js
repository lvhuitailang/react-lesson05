import React, {Component} from 'react';
import {Form,Card,Input,Checkbox,Button,Spin} from 'antd';
import { UserOutlined ,LockOutlined } from '@ant-design/icons';
import  indexCss from './index.less';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {loginRequest} from '../../actions/login';

const mapToState = state =>{
    return {
        user:state.user
    }
}

@connect(mapToState,{loginRequest})
class Login extends Component {
    constructor() {
        super();
        this.formRef = React.createRef();
    }
    layout={
        labelCol:{
            md:{
                span:6
            },
            lg:{
                span:7
            },
        },
        wrapperCol:{
            md:{
                span:12
            },
            lg:{
                span:10
            },
        }

    }
    tailLayout = {
        wrapperCol: {
            md:{
                offset:6,
                span:12
            },
            lg:{
                offset:7,
                span:10
            },
        }
    }

    onFinish = (values)=>{
        this.props.loginRequest(values,this.props.history)
    }


    render() {
        return (
            <Spin spinning={this.props.user.isLogining} tip={'登录中...'} >
                <Card className={'loginCard'} title={'系统登录'} bordered={false}>
                    <Form
                        layout={'horizontal'}
                        {...this.layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        ref={this.formRef}
                        onFinish={this.onFinish}

                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input  disabled={this.props.user.isLogining} prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />}  disabled={this.props.user.isLogining} />
                        </Form.Item>

                        <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                            <Checkbox disabled={this.props.user.isLogining}>Remember me</Checkbox>
                            <Button type="primary" htmlType="submit" disabled={this.props.user.isLogining} >
                                登录
                            </Button>
                        {/*</Form.Item>*/}

                        {/*<Form.Item {...this.tailLayout}>*/}

                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        );
    }
}

export default Login;