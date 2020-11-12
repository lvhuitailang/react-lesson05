import React, {Component} from 'react';
import {Button, Card, Table,List,Avatar,Badge} from "antd";

class Notifactions extends Component {

    checkAll = ()=>{

    }
    checkOne = ()=>{

    }
    data = [
        {
            title: 'Ant Design Title 1',
            read:false
        },
        {
            title: 'Ant Design Title 2',
            read:true
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
            read:true
        },
    ];
    render() {
        return (
            <>
                <Card title="通知" bordered={false} extra={<Button onClick={this.checkAll}>全部标记为已读</Button>} >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.data}
                        renderItem={item => (
                            <List.Item
                                extra={<Button onClick={this.checkOne}>标记为已读</Button>}

                            >
                                <List.Item.Meta
                                    avatar={
                                        <Badge dot={true} style={{display:!item.read?'flex':'none'}}>
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        </Badge>
                                    }
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />

                </Card>

            </>
        );
    }
}

export default Notifactions;