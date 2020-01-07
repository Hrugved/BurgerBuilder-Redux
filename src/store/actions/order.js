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
    console.log('here')
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