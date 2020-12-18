import React, {Component} from 'react';
import {connect} from "react-redux";

const mapToState = state => {
    return {
        count:state.getIn(['counter','count'])
    }
}
@connect(mapToState)
class CounterDisplay extends Component {
    render() {
        return (
            <div>
                {this.props.count}
            </div>
        );
    }
}

export default CounterDisplay;