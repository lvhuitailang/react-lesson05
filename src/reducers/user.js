import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('authToken')) ||  Boolean(window.sessionStorage.getItem('authToken'));
const userInfo = JSON.parse(window.localStorage.getItem('userInfo') || window.sessionStorage.getItem('userInfo'))
const initState = {
    ...userInfo,
    isLogin:isLogin,
    isLogining:false //登录中
}

const userChange = (state = initState,action)=>{
    switch (action.type) {
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLogining:true,
                isLogin:false
            }

        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.user,
                isLogining:false,
                isLogin: true,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                id:'',
                nickname:'',
                avator:'',
                role:'',
                isLogin:false,
                isLogining:false //登录中
            }
        case actionTypes.LOGOUT:
            return {
                id:'',
                nickname:'',
                avator:'',
                role:'',
                isLogin:false,
                isLogining:false //登录中
            }
        case actionTypes.CHANGE_AVATOR:
            return {
                ...state,
                avator: action.payload.avator
            }

        default:
            return state;

    }



}

export default userChange;