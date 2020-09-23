import React, {Component} from 'react';
import './index.less'

import {
    Button
} from "antd";

const testHoc = (WrappedComponent)=>{
    return class HocComponent extends Component{
        render() {
            return (
                <>
                    <WrappedComponent/>
                    <div>这是高阶组件</div>
                </>
            )
        }
    }
}

@testHoc
class App extends Component {
    render() {
        return (
            <div>
                App
                <Button >按钮</Button>
            </div>
        );
    }
}

export default App;