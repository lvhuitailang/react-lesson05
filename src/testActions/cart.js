import ActionType from "./ActionType";

export const increase = (id)=>{
    return {
        type:ActionType.CART_AMOUNT_INCREASE,
        payload:{
            target:'cart',
            id:id
        }
    }
}
export const decrease = (id)=>{
    return {
        type:ActionType.CART_AMOUNT_DECREASE,
        payload:{
            target:'cart',
            id:id
        }
    }
}
export const decreaseAsync = id => dispatch => {
    window.setTimeout(() => {
        dispatch(decrease(id))
    }, 2000);


}