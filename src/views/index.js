import React from "react";

/*
import Dashboard from "./Dashboard";
import Login from "./Login";
import NotFound from "./NotFound";
import Settings from "./Settings";
import ArticleList from "./Article";
import ArticleEdit from "./Article/Edit";
*/

import {Loading} from "../components";
import Loadable from 'react-loadable';

const Dashboard = Loadable({
    loader : () => import('./Dashboard'),
    loading : Loading
});
const Login = Loadable({
    loader : () => import('./Login'),
    loading : Loading
});
const NotFound = Loadable({
    loader : () => import('./NotFound'),
    loading : Loading
});
const Settings = Loadable({
    loader : () => import('./Settings'),
    loading : Loading
});
const ArticleList = Loadable({
    loader : () => import('./Article'),
    loading : Loading
});
const ArticleEdit = Loadable({
    loader : () => import('./Article/Edit'),
    loading : Loading
});
const Notifactions = Loadable({
    loader : () => import('./Notifactions'),
    loading : Loading
});
const NoAuth = Loadable({
    loader : () => import('./NoAuth'),
    loading : Loading
});


export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifactions,
    NoAuth
}