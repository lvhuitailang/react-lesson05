import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb,Dropdown,Avatar,Badge} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import logo from './logo.png'
import indexcss from './index.less'
import {adminRoutes} from '../../routes'
import {connect} from 'react-redux';

import {ge_all_notifactions} from '../../actions/notifactions'
import {logout_async} from '../../actions/login'


const {Header, Content, Sider} = Layout;

const mapStateToProps = (state)=>{
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'));
    return{
        notifactionCount:state.notifactions.list.filter(item=>item.read !== true).length,
        user: {...state.user,...userInfo}
    }
}
@connect(mapStateToProps,{ge_all_notifactions,logout_async})
@withRouter
class Frame extends Component {

    constructor() {
        super();
        this.state = {
            breadcrumbs:adminRoutes[0].pathname.split('/').map((item,index) => {
                return <Breadcrumb.Item key={'Breadcrumb'+index}>{item}</Breadcrumb.Item>;
            })
        };

    }

    componentDidMount() {
        this.props.ge_all_notifactions();
    }

    logout = ()=>{
        this.props.logout_async(this.props.user);
    }

    menuClick = ({ key }) =>{
       this.props.history.push(key);
    }
    dropMenuClick = ({key})=>{
        if(key && '/logOut' !== key){
            this.props.history.push(key);
        }
    }
    dropDownMenu = ()=>{
        return (
            <Menu onClick={this.dropMenuClick}>
                <Menu.Item key="/admin/notifactions">
                    <Badge dot={this.props.notifactionCount>0}>通知
                    </Badge></Menu.Item>
                <Menu.Item key="/admin/settings">设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="/logOut" onClick={this.logout}>退出</Menu.Item>
            </Menu>
        )
    }

    render() {
        let keypathnameArr = this.props.location.pathname.split('/');
        keypathnameArr.length=3;
        return (
            <Layout>
                <Header className="header" style={{'background': '#fff'}}>
                    <div className="logo logo-div">
                        <img className={'logo-img'} src={logo} alt={'logo'}/>
                    </div>
                    <Dropdown overlay={this.dropDownMenu} trigger={['hover']}>
                        <div className="ant-dropdown-link" style={{cursor:'pointer',display:'flex',alignItems:'center'}} onClick={e => e.preventDefault()}>
                            <Badge count={this.props.notifactionCount} offset={[10,0]}>
                                <Avatar src={this.props.user.avator} />
                            </Badge>
                            <span>欢迎你！{this.props.user.nickname}</span>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={[keypathnameArr.join('/')]}//默认选择第一个菜单
                            // defaultOpenKeys={['sub1']}   //这个是如果有子菜单的情况默认打开的子菜单
                            style={{height: '100%', borderRight: 0}}
                            onClick={this.menuClick}
                        >
                            {adminRoutes.filter(item1 => item1.isNav).map((item2, index) => {
                                return <Menu.Item key={item2.pathname} icon={item2.icon} title={item2.title} >
                                    {item2.title}
                                </Menu.Item>
                            })}
                        </Menu>
                    </Sider>
                    <Layout className={'content-layout'}>
                        <Content
                            // className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                background: '#fff'
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Frame;