import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import {NavLink} from 'react-router-dom'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'

class Orders extends Component {

    componentDidMount(props) {
        console.log(this.props.token)
       this.props.onFetchOrders(this.props.token,this.props.userId)
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            if(this.props.orders.length){
                orders = this.props.orders.map(order => {
                    return (
                        <Order 
                            ingredients={order.ingredients}
                            price={order.price}
                            key={order.id}
                        />
                    )
                })
            }
            else {
                const style= {
                    marginTop: '5rem',
                    textAlign: 'center'
                }
                orders = (
                    <div style={style}>
                        <p style={{fontSize: '3rem'}}>You have no orders to display</p>
                        <NavLink to='/'>Order a Delcious burger now</NavLink>
                    </div>
                )
            }
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios))