import actionTypes from '../actions/actionTypes'

const initState = {
    loading:false,//页面加载
    doLoading:false,//操作加载
    list:[
        /*{
            id:1,
            title: 'Ant Design Title 1',
            read:false,
            desc:'lore efaw  rfeqw rqre qrqw tqwg qwtgq t bag ate'
        },
        {
            id:2,
            title: 'Ant Design Title 2',
            read:true,
            desc:'lore efaw  rfeqw rqre qrqw tqwg qwtgq t bag ate'
        },
        {
            id:3,
            title: 'Ant Design Title 3',
            desc:'lore efaw  rfeqw rqre qrqw tqwg qwtgq t bag ate'
        },
        {
            id:4,
            title: 'Ant Design Title 4',
            read:true,
            desc:'lore efaw  rfeqw rqre qrqw tqwg qwtgq t bag ate'
        },*/
    ]
}

const changeState = (state = initState,action)=>{
    switch (action.type){
        case actionTypes.MARK_NOTIFACTION_READ_BY_ID:
            const newListReadById = state.list.map(item=>{
                if(item.id === action.payload.id){
                    item.read = true
                }
                return item;
            })
            return {
                ...state,
                list:newListReadById
            }
        case actionTypes.MARK_NOTIFACTION_READ_ALL:
            const newListReadAll = state.list.map(item=>{
                if(item.read !== true){
                    item.read = true
                }
                return item;
            })
            return {
                ...state,
                list:newListReadAll
            }
        case actionTypes.NOTIFACTION_LOADING_FINISH:
            return {
                ...state,
                list:action.payload.list
            }
        case actionTypes.NOTIFACTION_DOLOADING_TRUE:
            return {
                ...state,
                doLoading:true
            }
        case actionTypes.NOTIFACTION_DOLOADING_FALSE:
            return {
                ...state,
                doLoading:false
            }
        case actionTypes.NOTIFACTION_LOADING_TRUE:
            return {
                ...state,
                loading:true
            }
        case actionTypes.NOTIFACTION_LOADING_FALSE:
            return {
                ...state,
                loading:false
            }
        default:
            return state;
    }



}

export default changeState;

