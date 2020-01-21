import * as actionTypes from '../actions/actionsTypes'
import axios from '../../axios-orders'

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerSuccess = (id,orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (order) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', order) 
      .then(res => {
          dispatch(purchaseBurgerSuccess(res.data.name,order))
      })
      .catch(err => {
          dispatch(purchaseBurgerFail(err))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
    .then(Orders => {
        if(Orders.data){
            const orders = Object.keys(Orders.data).map(order => {
                return { ...Orders.data[order] , id:order }
            })
            dispatch(fetchOrdersSuccess(orders))
        }
    })
    .catch(e => {
      dispatch(fetchOrdersFail(e))
    })
  }
}