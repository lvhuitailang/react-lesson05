import React, {Component} from 'react';
import {Card, Upload,Spin} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import Axios from "axios";
import {change_avator} from '../../actions/login'

const mapToState = state =>{
    return {
        user:state.user
    }
}
@connect(mapToState,{change_avator})
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            linkurl:'',//原图
            t_url:'',//缩略图
            uploading:false,
            uploadUrl:'http://up.imgapi.com/',
            Token:'1af398242ac4c751990d973b9259970838af1902:V6gN3AL2Tp8oZ7GR_u_-_MJcGtY=:eyJkZWFkbGluZSI6MTYwODE4NDEwNywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzMwOTU2IiwiYWlkIjoiMTczNTYyNyIsImZyb20iOiJmaWxlIn0='
        }
    }

    uploadButton = ()=>{
        return (
            <div>
                {this.state.uploading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
    }
    handleUpload = (args)=>{
        let file = args.file;
        let formData = new FormData();
        formData.append('Token',this.state.Token)
        formData.append('file',file);
        this.setState({
            uploading:true
        })
        Axios.post(this.state.uploadUrl,formData).then(resp=>{
            if(resp && 200 === resp.status){
                this.setState({
                    t_url:resp.data.t_url,
                    linkurl:resp.data.linkurl
                },()=>{
                    this.props.change_avator(this.state.t_url);
                })

            }
        }).catch(err=>{

        }).finally(()=>{
            this.setState({
                uploading:false
            })

        });


        this.setState({
            uploading:true
        })
    }

    render() {
        return (
           <Card
           title={'个人中心'}
           bordered={false}
           >

               <Upload
                   name="avatar"
                   listType="picture-card"
                   className="avatar-uploader"
                   showUploadList={false}
                   customRequest={this.handleUpload}
                   // beforeUpload={beforeUpload}
                   // onChange={this.handleChange}
               >
                   <Spin spinning={this.state.uploading}>
                       {this.props.user.avator ? <img src={this.props.user.avator} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton()}
                   </Spin>
               </Upload>


           </Card>
        );
    }
}

export default Profile;