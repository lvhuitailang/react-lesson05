import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('authToken')) ||  Boolean(window.sessionStorage.getItem('authToken'));
const initState = {
    id:'',
    nickname:'',
    avator:'',
    role:'',
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
                ...state,
                isLogin: false,
                isLogining:false,
            }

        default:
            return state;

    }



}

export default userChange;