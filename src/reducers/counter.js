import ActionTypes from '../actions/actionTypes'
import {fromJS} from 'immutable'

const initState = fromJS({
    count:100
})

export default (state=initState,action)=>{
    console.log(initState.toJS(),state.toJS())
    switch (action.type){
        case ActionTypes.ADD:
            return state.update('count',v=>v+1)
        case ActionTypes.SUB:
            return state.update('count',v=>v-1)
        default:
            return state;
    }
}