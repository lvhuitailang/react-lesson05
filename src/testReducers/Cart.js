import ActionType from "../testActions/ActionType";

const initState = [{
    id:1,
    name:'apple',
    price:5,
    amount:10,
},{
    id:2,
    name:'pear',
    price:6,
    amount:5,
}]

export default (state = initState,action)=>{
    if(!action || !action.payload || !action.payload.target || 'cart' !== action.payload.target){
        return state;
    }
    switch (action.type){
        case ActionType.CART_AMOUNT_INCREASE:
            return (state.map(item=>{
                if(item.id === action.payload.id){
                    item.amount = item.amount+1;
                }

                return item;
            }))
        case ActionType.CART_AMOUNT_DECREASE:
            return (state.map(item=>{
                if(item.id === action.payload.id){
                    item.amount = item.amount-1;
                }

                return item;
            }))
        default :
            return state;
    }

}