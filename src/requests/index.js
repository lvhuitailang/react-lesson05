import Axios from "axios";
import {message} from 'antd';


const isDev = process.env.NODE_ENV === 'development';

const service = Axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/268193/':''
});
const serviceNoToken = Axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/268193/':''
});

service.interceptors.request.use(config => {
    //
    const authToken = window.localStorage.getItem('authToken') ||  window.sessionStorage.getItem('authToken');
    if(Boolean(authToken)){
        config.headers.authToken = authToken;//请求头
    }else{
        message.error('请登录后操作!');
        window.localStorage.removeItem('authToken');
        window.sessionStorage.removeItem('authToken');
        window.sessionStorage.removeItem('userInfo');
        window.setTimeout(()=>{
            window.location.href= '/#/login';
        },500);

    }
    return config;
});

service.interceptors.response.use(resp => {
    if(resp && 200 === resp.status && 200 === resp.data.code){
        return resp.data.data;
    }else{
        message.error(resp.data.errMsg);
        return Promise.reject(resp.data.errMsg);
    }
},error => {
    message.error('网络错误');
    return Promise.reject('网络错误');
});
serviceNoToken.interceptors.response.use(resp => {
    if(resp && 200 === resp.status && 200 === resp.data.code){
        return resp.data.data;
    }else{
        message.error(resp.data.errMsg);
        return Promise.reject(resp.data.errMsg);
    }
},error => {
    message.error('网络错误');
    return Promise.reject('网络错误');
});


export const getArtileList = (offset=0, limited=10) => {
    return service.post('api/v1/article/list',{
        offset,
        limited
    });
}

export const articleDelete = (id)=>{
    return service.post('api/v1/article/delById', {id});
}

export const getArticleById = (id)=>{
    return service.post('api/v1/article/getById', {id});
}

export const saveArticle = (id,data)=>{
    return service.post('api/v1/article/edit', {id,...data});
}
//月度统计图
export const monthlyVisit = ()=>{
    return service.post('api/v1/article/monthlyVisit');
}
//获取通知列表
export const getAllNotifactions = ()=>{
    return service.post('api/v1/notifactions/list');
}
export const loginPost = (userInfo) =>{
    return serviceNoToken.post('api/v1/loginPost',userInfo)
}