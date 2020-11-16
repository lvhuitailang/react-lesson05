import React, {Component} from 'react';
import indexless from './index.less'
import {increase,decrease} from '../../testActions/cart'
class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cartList:[]
        }
    }

    getState = ()=>{
        this.setState({
            cartList:this.props.store.getState().cart
        })
    }
    componentDidMount() {
        this.getState();
        this.props.store.subscribe(this.getState);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>商品名称</td>
                            <td>单价</td>
                            <td>数量</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.cartList.map(item=>{

                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={()=>{
                                        this.props.store.dispatch(decrease(item.id))
                                    }}>-</button>
                                    <span>{item.amount}</span>
                                    <button onClick={()=>{
                                        this.props.store.dispatch(increase(item.id))
                                    }}>+</button>
                                </td>
                                <td>操作</td>
                            </tr>
                        )


                    })}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default Cart;