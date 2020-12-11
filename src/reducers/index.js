import {combineReducers} from 'redux';
import notifactions from './notifactions'
import user from './user'

export default combineReducers({
    notifactions,
    user
});