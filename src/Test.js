import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {CartList} from "./testComponents";
import store from './store'

window.store = store;

class Test extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                        <CartList />
                </Provider>
            </div>
        );
    }
}

export default Test;