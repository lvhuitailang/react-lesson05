import React, {Component} from 'react';
import {Button, Card, Table,Tag} from 'antd';
import {getArtileList} from '../../requests'
import moment from "moment";
class ArticleList extends Component {
    componentDidMount() {
        this.getData();
    }

    getData = ()=>{
        this.setState({
            isLoading:true
        })
        getArtileList().then(resp =>{
            console.log(resp)
            const columns = [
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: '阅读量',
                    dataIndex: 'amount',
                    key: 'amount',
                    render:(text, record, index)=>{
                        let amount = record.amount;
                        return <Tag color={amount>250?'red':'green'}>{amount}</Tag>
                    }
                },
                {
                    title: '发表时间',
                    dataIndex: 'createAt',
                    key: 'createAt',
                    render:(text, record, index)=>{
                        //这里用moment.js很方便
                        // let date = new Date(record.createAt);
                        // return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                        return moment(record.createAt).format('yyyy年MM月DD日 HH时mm分ss秒');
                    }
                },
                {
                    title:'操作',
                    dataIndex: 'actions',
                    key:'actions',
                    render:(text,record,index)=>{
                        return <Button.Group>
                            <Button size={"small"} type={'primary'}>编辑</Button>
                            <Button size={"small"} type={'danger'}>删除</Button>
                        </Button.Group>;
                    }
                }
            ]
            this.setState({
                total:resp.total,
                //这里key的值可以在table上面处理
                // dataSource:resp.list.map(item => {
                //     return {...item,...{key:item.id}}
                // }),
                dataSource:resp.list,
                columns:columns
            });
        }).catch(err=>{

        }).finally(()=>{
            this.setState({
                isLoading:false
            })
        });
    }
    constructor() {
        super();
        this.state = {
            isLoading:false
        }
    }
    render() {
        return (
            <>
                <Card title="文章列表" extra={<a href="#">More</a>} >
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        loading={this.state.isLoading}
                        pagination={{
                            total: this.state.total,
                            hideOnSinglePage: true
                        }}
                    />
                </Card>
            </>
        );
    }
}

export default ArticleList;