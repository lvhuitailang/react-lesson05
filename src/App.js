import React, {Component} from 'react';
import './index.less'
import {Route,Switch,Redirect} from 'react-router-dom'
import {adminRoutes} from "./routes";
import Frame from "./components/Frame";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return {user:state.user}
}

@connect(mapStateToProps)
class App extends Component {
    render() {
        return (
            this.props.user.isLogin
            ?

            <div style={{'height':'100%'}}>
                <Frame>
                    <Switch>
                        {
                            adminRoutes.map((item, index) => {
                                return <Route key={item.pathname+index} path={item.pathname} exact={item.exact} render={(routerProps) => {
                                    //TODO 页面级别的权限验证
                                    return <item.component {...routerProps}/>
                                }}/>
                            })
                        }
                        <Redirect from={'/admin'} to={adminRoutes[0].pathname} exact/>
                        <Redirect to={'/404'} />
                    </Switch>
                </Frame>
            </div>
                :
                <Redirect to={'/login'}/>
        );
    }
}

export default App;