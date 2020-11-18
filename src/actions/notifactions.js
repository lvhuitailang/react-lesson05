import actionTypes from "./actionTypes";
import {getAllNotifactions} from '../requests'
import {message} from "antd";

const markNotifactionReadByIdSync = id => {
    return {
        type: actionTypes.MARK_NOTIFACTION_READ_BY_ID,
        payload: {
            id: id
        }
    }
}

const markNotifactionReadAllSync = () => {
    return {
        type: actionTypes.MARK_NOTIFACTION_READ_ALL
    }
}

//根据id已读
export const markNotifactionReadById = id => dispatch => {
    dispatch(notifaction_doloading_true());
    window.setTimeout(() => {
        dispatch(markNotifactionReadByIdSync(id));
        dispatch(notifaction_doloading_false());
    }, 2000);
}
//所有已读
export const markNotifactionReadAll = () => dispatch => {
    dispatch(notifaction_doloading_true());
    window.setTimeout(() => {
        dispatch(markNotifactionReadAllSync());
        dispatch(notifaction_doloading_false());
    }, 2000);
}

// 通知操作加载中
const notifaction_doloading_true = ()=>{
    return{
        type: actionTypes.NOTIFACTION_DOLOADING_TRUE,
    }
}
//  通知操作没有加载中
const notifaction_doloading_false = ()=>{
    return{
        type: actionTypes.NOTIFACTION_DOLOADING_FALSE,
    }
}
// 通知列表加载中
const notifaction_loading_true = ()=>{
    return{
        type: actionTypes.NOTIFACTION_LOADING_TRUE,
    }
}
// 通知列表没有加载中
const notifaction_loading_false = ()=>{
    return{
        type: actionTypes.NOTIFACTION_LOADING_FALSE,
    }
}
const notifaction_loading_finish = (list)=>{
    return{
        type:actionTypes.NOTIFACTION_LOADING_FINISH,
        payload:{
            list:list
        }
    }
}
//获取所有通知列表
export const ge_all_notifactions = ()=>dispatch=>{
    dispatch(notifaction_loading_true());
    getAllNotifactions().then(resp=>{
        dispatch(notifaction_loading_finish(resp.list));
    }).catch(err=>{
        message.error('数据获取失败!');

    }).finally(()=>{
        dispatch(notifaction_loading_false());
    })


}

