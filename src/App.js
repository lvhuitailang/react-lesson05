import React, {Component} from 'react';
import './index.less'
import {Route,Switch,Redirect} from 'react-router-dom'
import {adminRouter} from "./routes";


import {
    Button
} from "antd";

class App extends Component {
    render() {
        return (
            <div>
                <div>这里是公共的部分</div>
                <Switch>
                {
                    adminRouter.map((item, index) => {
                        return <Route key={item.pathname+index} path={item.pathname} exact={item.exact} render={(routerProps) => {
                            //TODO 页面级别的权限验证
                            return <item.component {...routerProps}/>
                        }}/>
                    })
                }
                <Redirect from={'/admin'} to={adminRouter[0].pathname} exact/>
                <Redirect to={'/404'} />
                </Switch>
            </div>
        );
    }
}

export default App;