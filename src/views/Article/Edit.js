import React, {Component} from 'react';
import {Button, Card, Table, Typography,Form,Input,DatePicker} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
const {Title,Text} = Typography;

class ArticleEdit extends Component {
    constructor() {
        super();
        this.state = {
            title:''
        }
    }
    formRef = React.createRef();
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }
    formButtonLayout = {
        wrapperCol: {
            span: 14,
            offset:4
        },
    }
    onReset = ()=>{
        this.formRef.current.resetFields();
    }
    onFinish = (values)=>{
        console.log(values)
    }


    render() {
        console.log(this.state)
        return (
            <>
                <Card title={<div><Title level={5}>文章编辑</Title><Text type="secondary" ellipsis={true}>{'《'+this.state.title+'》'}</Text></div>} extra={ <div><Button>取消</Button></div>} >
                    <Form
                        ref={this.formRef}
                        layout={'horizontal'}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        {...this.layout}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题!',
                                },
                            ]}
                            {...this.formItemLayout}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入作者!',
                                },
                            ]}
                            {...this.formItemLayout}
                        >
                            <Input type={'number'} />
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    validator:(r,v,c)=>{
                                        if(v && !isNaN(v) && parseFloat(v).toString() !== 'NaN'){
                                            return Promise.resolve();
                                        }else{
                                            return Promise.reject('只能输入数字。')
                                        }

                                    }
                                }
                            ]}
                            {...this.formItemLayout}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="发表时间"
                            name="createAt"
                            {...this.formItemLayout}
                        >
                            <DatePicker showTime placeholder={'选择时间'} locale={locale}  />
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入内容!',
                                },
                            ]}
                            {...this.formItemLayout}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            {...this.formButtonLayout}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>

                        </Form.Item>

                    </Form>


                </Card>
            </>
        );
    }
}

export default ArticleEdit;