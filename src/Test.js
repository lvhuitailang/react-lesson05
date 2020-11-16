import React, {Component} from 'react';

import {CartList} from "./testComponents";
import store from './store'

window.store = store;

class Test extends Component {
    render() {
        return (
            <div>
                <CartList store={store} />
            </div>
        );
    }
}

export default Test;