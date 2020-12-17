import React, {Component} from 'react';
import {Button, Card,List,Avatar,Badge,Spin} from "antd";
import {connect} from 'react-redux';
import {markNotifactionReadById,markNotifactionReadAll,ge_all_notifactions} from '../../actions/notifactions'

const mapStateToProps = (state)=>{
    return{
        notifactions:state.notifactions
    }
}
@connect(mapStateToProps,{markNotifactionReadById,markNotifactionReadAll,ge_all_notifactions})
class Notifactions extends Component {
    componentDidMount() {
        this.props.ge_all_notifactions();
    }

    render() {
        return (
            <>
            <Spin spinning={this.props.notifactions.doLoading}>
                <Card loading={this.props.notifactions.loading} title="通知" bordered={false} extra={<Button disabled={this.props.notifactions.list.every(item=>item.read === true)} onClick={this.props.markNotifactionReadAll}>全部标记为已读</Button>} >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.notifactions.list}
                        renderItem={item => (
                            <List.Item
                                extra={item.read?null:<Button onClick={this.props.markNotifactionReadById.bind(this,item.id)}>标记为已读</Button>}

                            >
                                <List.Item.Meta
                                    avatar={
                                        <Badge dot={!item.read} >
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        </Badge>
                                    }
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.desc}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
            </>
        );
    }
}

export default Notifactions;