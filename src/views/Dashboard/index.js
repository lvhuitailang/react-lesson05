import React, {Component} from 'react';
import {Button, Card, Row, Col, Spin} from "antd";
import {monthlyVisit} from '../../requests'
import echarts from 'echarts';
import './index.less';

class Dashboard extends Component {
    constructor() {
        super();
        this.articleAmountRef = React.createRef();
        this.articleAmountRef2 = React.createRef();
        this.state = {isLoading:false}
    }
    initArticleAmountFun = ()=>{
        let option = {
            title:{
              text:'月度浏览量折线图'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                type: 'category',
                // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                // data: [8200, 9320, 9010, 9340, 12900, 13300, 13200],
                type: 'line'
            }]
        };

        //
        let option2 = {
            title:{
                text:'月度浏览量柱状图'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                type: 'category',
                // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                // data: [8200, 9320, 9010, 9340, 12900, 13300, 13200],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
        };
        if(!this.updater.isMounted(this)){
            //如果请求过程中，Article组件已经销毁（比如切换了菜单），就不要设置值了
            return
        }
        this.setState({
            isLoading:true
        })
        monthlyVisit().then(resp=>{
            option.xAxis.data = resp.month;
            option.series[0].data = resp.amount;
            option2.xAxis.data = resp.month;
            option2.series[0].data = resp.amount;
            this.articleAmountChart = echarts.init(this.articleAmountRef.current);
            this.articleAmountChart.setOption(option);
            this.articleAmountChart2 = echarts.init(this.articleAmountRef2.current);
            this.articleAmountChart2.setOption(option2);

        }).catch(err=>{

        }).finally(()=>{
            if(!this.updater.isMounted(this)){
                //如果请求过程中，Article组件已经销毁（比如切换了菜单），就不要设置值了
                return
            }
            this.setState({
                isLoading:false
            })
        })




    }
    componentDidMount() {
        this.initArticleAmountFun();
    }

    render() {
        return (
            <>
                <Card title="信息摘要" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>} >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className={'flat-card'} style={{backgroundColor:'#81D4FA'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={'flat-card'} style={{backgroundColor:'#CE93D8'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={'flat-card'} style={{backgroundColor:'#00ACC1'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={'flat-card'} style={{backgroundColor:'#BF360C'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览" bordered={false}  >
                    <Spin spinning={this.state.isLoading}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <div className={'chart-card articleAmountDiv'} ref={this.articleAmountRef}></div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div className={'chart-card articleAmountDiv2'} ref={this.articleAmountRef2}></div>
                            </Col>
                        </Row>
                    </Spin>

                </Card>

            </>
        );
    }
}

export default Dashboard;