import React, {Component} from 'react';
import {Card,Table} from 'antd';

class ArticleList extends Component {
    constructor() {
        super();
        this.state = {
            dataSource:[
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    address: '西湖区湖底公园1号',
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
                },
            ],
            columns : [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                },
            ]
        }
    }
    render() {
        return (
            <>
                <Card title="文章列表" extra={<a href="#">More</a>} >
                    <Table d
                           dataSource={this.state.dataSource}
                           columns={this.state.columns}
                    />
                </Card>
            </>
        );
    }
}

export default ArticleList;