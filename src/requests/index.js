import Axios from "axios";
import {message} from 'antd';


const isDev = process.env.NODE_ENV === 'development';

const service = Axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/268193/':''
});

service.interceptors.request.use(config => {
    config.headers.authToken = 'aaa';//请求头
    //
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


export const getArtileList = (offset=0, limited=10) => {
    return service.post('api/v1/articleList',{
        offset,
        limited
    });
}

export const articleDelete = (id)=>{
    return service.post('api/v1/articleDelete', {id});
}