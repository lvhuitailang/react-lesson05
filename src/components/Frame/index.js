import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import logo from './logo.png'
import indexcss from './index.less'
import {adminRoutes} from '../../routes'
const {Header, Content, Sider} = Layout;


class Frame extends Component {
    render() {
        console.log(this.props)
        return (
            <Layout>
                <Header className="header" style={{'background': '#fff'}}>
                    <div className="logo logo-div">
                        <img className={'logo-img'} src={logo} alt={'logo'}/>
                    </div>

                    {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>*/}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            {adminRoutes.filter(item1 => item1.isNav).map((item2, index) => {
                                return <Menu.Item key={item2.pathname + index} icon={item2.icon} >
                                    {item2.title}
                                </Menu.Item>
                            })}

                            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            </SubMenu>*/}
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
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