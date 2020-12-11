import actionTypes from "./actionTypes";
import {getAllNotifactions, loginPost} from '../requests'
import {message} from "antd";

const start_login = ()=>{
    return {
        type:actionTypes.START_LOGIN
    }
}
const end_login = ()=>{
    return {
        type:actionTypes.END_LOGIN
    }
}

const login_success = ()=>{
    return {
        type:actionTypes.LOGIN_SUCCESS
    }
}

const login_fail = ()=>{
    return {
        type:actionTypes.LOGIN_FAIL
    }
}

//获取所有通知列表
export const loginRequest = (userInfo)=>dispatch=>{
    dispatch(start_login());
    loginPost(userInfo).then(resp=>{
        console.log(resp)
        dispatch(login_success());
    }).catch(err=>{
        message.error('登录失败!');
        dispatch(login_fail());

    }).finally(()=>{
        dispatch(end_login());
    })


}