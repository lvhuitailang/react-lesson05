import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootRecuders from './testReducers'

export default createStore(rootRecuders,applyMiddleware(thunk))