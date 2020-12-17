import actionTypes from "./actionTypes";
import {loginPost} from '../requests'
import {message} from "antd";

const start_login = ()=>{
    clearAuth();
    return {
        type:actionTypes.START_LOGIN
    }
}
const end_login = ()=>{
    return {
        type:actionTypes.END_LOGIN
    }
}
const logout = ()=>{
    clearAuth();
    // window.location.href = '/';
    return {
        type:actionTypes.LOGOUT
    }
}

export const logout_async = (userInfo)=>dispatch=>{
    //这里应该告诉服务端
    dispatch(logout());
}

const login_success = (userInfo)=>{
    clearAuth();
    if(true === userInfo.remember){
        window.localStorage.setItem('authToken',userInfo.authToken);
        window.localStorage.setItem('userInfo',JSON.stringify({username:userInfo.username,nickname:userInfo.nickname,avator:userInfo.avator,role:userInfo.role}));
    }else{
        window.sessionStorage.setItem('authToken',userInfo.authToken);
        window.sessionStorage.setItem('userInfo',JSON.stringify({username:userInfo.username,nickname:userInfo.nickname,avator:userInfo.avator,role:userInfo.role}));
    }
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            user:userInfo
        }
    }
}

const login_fail = ()=>{
    clearAuth();
    return {
        type:actionTypes.LOGIN_FAIL
    }
}

//登录
export const loginRequest = (userInfo,his)=>dispatch=>{
    dispatch(start_login());
    window.setTimeout(()=>{
        loginPost({...userInfo,rememberMe:userInfo.remember}).then(resp=>{
            dispatch(login_success({...userInfo,...resp}));
            his.push('/')
        }).catch(err=>{
            message.error('登录失败!');
            dispatch(login_fail());

        }).finally(()=>{
            dispatch(end_login());
        })


    },2000);//模拟登陆延时
}

export const change_avator = avatorUrl=>{
    //更新下sessionStorage和localStorage
    const localStorageUser = JSON.parse(window.localStorage.getItem('userInfo'));
    const sessionStorageUser = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if(localStorageUser){
        localStorageUser.avator = avatorUrl;
        window.localStorage.setItem('userInfo',JSON.stringify(localStorageUser));
    }
    if(sessionStorageUser){
        sessionStorageUser.avator = avatorUrl;
        window.sessionStorage.setItem('userInfo',JSON.stringify(sessionStorageUser));
    }

    //然后更新redux里面的
    return {
        type:actionTypes.CHANGE_AVATOR,
        payload:{
            avator:avatorUrl
        }
    }

}

const clearAuth = ()=>{
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('userInfo');
}