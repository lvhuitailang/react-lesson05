import Axios from "axios";
import {message} from 'antd';


const isDev = process.env.NODE_ENV === 'development';

const service = Axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/268193/api/v1/articleList':''
});

service.interceptors.request.use(config => {
    config.headers.authToken = 'aaa';//请求头
    //
    return config;
});

service.interceptors.response.use(resp => {
    resp = resp.data;
    if(resp && 200 !== resp.code){
        message.error(resp.data.errMsg);
    }
    return resp.data;
});


export const getArtileList = () => {
    return service.post();
}
