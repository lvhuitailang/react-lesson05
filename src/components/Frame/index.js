import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {withRouter} from 'react-router-dom';
import logo from './logo.png'
import indexcss from './index.less'
import {adminRoutes} from '../../routes'
const {Header, Content, Sider} = Layout;


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

    menuClick = ({ key }) =>{
       this.props.history.push(key);
    }

    render() {
        // console.log(this.props)
        let keypathnameArr = this.props.location.pathname.split('/');
        keypathnameArr.length=3;
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

                            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            </SubMenu>*/}
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