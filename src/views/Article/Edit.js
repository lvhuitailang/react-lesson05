import React, {Component} from 'react';
import {Button, Card, Typography,Form,Input,DatePicker,Spin,message} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from "moment";
import Editor from "wangeditor";
import {getArticleById,saveArticle} from '../../requests'

const {Title,Text} = Typography;
class ArticleEdit extends Component {
    constructor() {
        super();
        this.formRef = React.createRef();
        this.contentRef = React.createRef();
        this.state = {
            title:'',
            isLoading:false
        }
    }
    componentDidMount() {
        this.initEditor();
        this.getInitValue();
    }
    UNSAFE_componentWillUnmount() {
        this.ed.destroy();
    }

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
    //初始化富文本编辑器
    initEditor = ()=>{
        this.ed = new Editor(this.contentRef.current);
        this.ed.config.zIndex = 1;
        this.ed.config.onchange = (newHtml)=>{
            this.formRef.current.setFieldsValue({
                content:newHtml
            });
        }
        this.ed.create();
    }
    //表单赋初始值
    getInitValue = ()=>{
        let id = this.props.match.params.id;
        this.setState({
            isLoading:true
        });
        getArticleById(id).then(resp=>{
            this.formRef.current.setFieldsValue({
                title : resp.title,
                author : resp.author,
                amount : resp.amount,
                createAt : moment(resp.createAt),
                content : resp.content
            });
            //设置富文本编辑器内容
            this.ed.txt.html(resp.content);
            //设置title
            this.setState({
                title:resp.title
            })

        }).catch(err=>{

        }).finally(()=>{
            this.setState({
                isLoading:false
            });
        })
    }
    backTo = ()=>{
        if(this.props && this.props.history){
            this.props.history.push('/admin/article');
        }
    }

    onReset = ()=>{
        // this.formRef.current.resetFields();//这个操作会让富文本框消失，暂未解决
        this.formRef.current.setFieldsValue({
            title:'',
            author:'',
            amount:'',
            createAt:undefined,
            content:''
        });
        this.ed.txt.html('');
    }
    onFinish = (values)=>{
        this.setState({
            isLoading:true
        });

        values.createAt = values.createAt.valueOf();
        saveArticle(this.props.match.params.id,values).then(resp=>{
            message.loading(resp.msg).then(()=>{
                this.backTo();
            });
        }).catch(err=>{

        }).finally(()=>{
            this.setState({
                isLoading:false
            });
        });
    }


    render() {
        return (
            <>
                <Spin spinning={this.state.isLoading}>
                <Card title={<div><Title level={5}>文章编辑</Title><Text type="secondary" ellipsis={true}>{'《'+this.state.title+'》'}</Text></div>} extra={ <div><Button onClick={this.props.history.goBack}>取消</Button></div>} >
                    <Form
                        ref={this.formRef}
                        layout={'horizontal'}
                        name="basic"
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
                            <Input  />
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
                            <Input type={'number'} />
                        </Form.Item>
                        <Form.Item
                            label="发表时间"
                            name="createAt"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入发表时间',
                                },
                            ]}
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
                                    validator:(r,v,c)=>{
                                        v = this.ed.txt.html()
                                        if(!v || '' === v){
                                            return Promise.reject('请输入内容');
                                        }else{
                                            return Promise.resolve();
                                        }

                                    }
                                }
                            ]}
                            {...this.formItemLayout}
                        >
                            <div ref={this.contentRef}/>
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
                </Spin>
            </>
        );
    }
}

export default ArticleEdit;