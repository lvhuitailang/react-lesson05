import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifactions,
    NoAuth, Profile
} from '../views'
import React from "react";
import {UnorderedListOutlined,DashboardOutlined,SettingOutlined } from '@ant-design/icons'

export const mainRoutes = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true,
    role:['001','002','003'],
    icon:<DashboardOutlined />
}, {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: '文章列表',
    isNav: true,
    role:['001','002'],
    icon:<UnorderedListOutlined />
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    role:['001'],
}, {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    role:['001'],
    icon:<SettingOutlined />
}, {
    pathname: '/admin/notifactions',
    component: Notifactions,
    title: '通知中心',
    role:['*']
}, {
    pathname: '/admin/noAuth',
    component: NoAuth,
    title: '未授权页面',
    role:['*']
}, {
        pathname: '/admin/profile',
        component: Profile,
        title: '未授权页面',
        role:['*']
    }
]