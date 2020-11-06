import React, {Component} from 'react';
import {Button, Card, Modal, Table, Tag,Typography,Tooltip} from 'antd';
import {getArtileList,articleDelete} from '../../requests'
import moment from "moment";
import XLSX from 'xlsx';

const {Text} = Typography;
class ArticleList extends Component {
    componentDidMount() {
        this.getData();
    }

    getData = ()=>{
        this.setState({
            isLoading:true
        })
        getArtileList(this.state.offset,this.state.limited).then(resp =>{
            const columns = [
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: '阅读量',
                    dataIndex: 'amount',
                    key: 'amount',
                    render:(text, record, index)=>{
                        let amount = record.amount;
                        return(
                        <Tooltip title={amount>250?'超过250':'没超过250'}>
                            <Tag color={amount>250?'red':'green'}>{amount}</Tag>
                        </Tooltip>
                        )

                    }
                },
                {
                    title: '发表时间',
                    dataIndex: 'createAt',
                    key: 'createAt',
                    render:(text, record, index)=>{
                        //这里用moment.js很方便
                        // let date = new Date(record.createAt);
                        // return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                        return moment(record.createAt).format('yyyy年MM月DD日 HH时mm分ss秒');
                    }
                },
                {
                    title:'操作',
                    dataIndex: 'actions',
                    key:'actions',
                    render:(text,record,index)=>{
                        return <Button.Group>
                            <Button size={"small"} type={'primary'} onClick={this.toEdit.bind(this,record)}>编辑</Button>
                            <Button size={"small"} type={'danger'} onClick={this.onDeleteArticle.bind(this,record)} >删除</Button>
                        </Button.Group>;
                    }
                }
            ]
            this.setState({
                total:resp.total,
                //这里key的值可以在下面table处理
                // dataSource:resp.list.map(item => {
                //     return {...item,...{key:item.id}}
                // }),
                dataSource:resp.list,
                columns:columns
            });
        }).catch(err=>{

        }).finally(()=>{
            this.setState({
                isLoading:false
            })
        });
    }

    constructor() {
        super();
        this.state = {
            isLoading:false,
            offset : 0,
            limited : 10,
        }
    }
    onPageChange = (page, pageSize)=>{
        this.setState({
            offset:pageSize * (page - 1),
            limited:pageSize
        },()=>{
            this.getData();
        });
    }
    onDeleteArticle = (record)=>{
        Modal.confirm({
            title:'提示',
            content:<>确认删除 <Text type="danger" ellipsis={true}>{record.title}</Text> ?</>,
            onCancel:()=>{

            },
            onOk:()=>{
                return new Promise((resolve,reject) => {
                    articleDelete(record.id).then(resp=>{
                        window.setTimeout(()=>{
                            this.getData();
                            resolve(resp);
                        },2000);
                    }).catch(err=>{
                        reject(err);
                    });

                })

            }
        });
    }

    toEdit = (record)=>{
        this.props.history.push({
            pathname:`/admin/article/edit/${record.id}`,
            state: {...record}
        });
    }

    exportExcel = ()=>{
        /* convert state to workbook */
        let sourceTitle = Object.keys(this.state.dataSource[0]);//表头，取表格的第一行数据的key
        let sourceData = this.state.dataSource.map(item=>Object.values(item));//数据
        sourceData.reduce((pre,cur)=>{//处理下时间
            cur[4] = moment(cur[4]).format('yyyy年MM月DD日 HH时mm分ss秒');
        },sourceData[0]);
        let exportData = [...[sourceTitle],...sourceData];
        const ws = XLSX.utils.aoa_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx")
    }
    render() {
        return (
            <>
                <Card title="文章列表" extra={<Button onClick={this.exportExcel}>导出当前页</Button>} >
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        loading={this.state.isLoading}
                        pagination={{
                            showQuickJumper:true,
                            total: this.state.total,
                            hideOnSinglePage: true,
                            onChange:this.onPageChange
                        }}
                    />
                </Card>
            </>
        );
    }
}

export default ArticleList;