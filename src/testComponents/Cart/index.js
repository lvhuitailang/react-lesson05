import React, {Component} from 'react';
import {connect} from 'react-redux';
import indexless from './index.less'
import {increase,decrease,decreaseAsync} from '../../testActions/cart'
class Cart extends Component {
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
                    {this.props.cartList.map(item=>{

                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={this.props.decreaseAsync.bind(this,item.id)}>等一会再减</button>
                                    <button onClick={this.props.increase.bind(this,item.id)}>-</button>
                                    <span>{item.amount}</span>
                                    <button onClick={this.props.decrease.bind(this,item.id)}>+</button>
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

const mapStateToProps = (state)=>{
    return {
        cartList:state.cart
    }
}

/*const mapDispatchToProps = (dispatch)=>{
    return{
        add:(id)=>dispatch(increase(id)),
        reduce:(id)=>dispatch(decrease(id))
    }
}*/

export default connect(mapStateToProps, {increase,decrease,decreaseAsync})(Cart);