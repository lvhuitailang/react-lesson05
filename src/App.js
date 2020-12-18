import React, {Component} from 'react';
import {connect} from "react-redux";
import './index.less'

import {
    CounterBtn,
    CounterDisplay
}from './components'

import {
    add,
    sub
} from './actions/counter';

const mapToState = state => {
    return {

    }
}
@connect(mapToState,{add,sub})
class App extends Component {
    render() {
        return (
            <div>
              <CounterBtn onClick={this.props.sub}>-</CounterBtn>
                <CounterDisplay>10</CounterDisplay>
              <CounterBtn onClick={this.props.add}>+</CounterBtn>
            </div>
        );
    }
}

export default App;