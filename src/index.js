import React from "react";
import {render} from "react-dom";
import App from './App'
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";

import {
    mainRoutes
} from "./routes";

render(
    <Router>
        <Switch>
            <Route path={'/admin'} render={(routerProps)=>{
                //TODO 后期做权限验证，需要登录才能访问admin
                return <App {...routerProps}/>
            }}/>
            {
                mainRoutes.map((item,index) => {
                    return <Route key={item.pathname+index} path={item.pathname} component={item.component} />
                })

            }
            <Redirect from={'/'} to={'/admin'} exact />
            <Redirect to={'/404'} />

        </Switch>
    </Router>
    , document.querySelector('#root')
);
