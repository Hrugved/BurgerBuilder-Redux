import * as actionTypes from "../actions/actionsTypes";
import {updateObject} from '../utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseBurgerFail = (state) => {
  return updateObject(state,{
    loading: false
  });
}

const purchaseBurgerSuccess = (state,action) => {
      return updateObject(state, {
        loading: false,
        orders: [] //old orders is dated => next time fetch fresh data from backend
      });
}

const purchaseBurgerStart = (state) => {
  return updateObject(state,{
    loading: true,
    purchased: true
  });
}

const purchaseInit = (state) => {
  return updateObject(state, {
    purchased: false
  });
} 

const fetchOrdersStart = (state) => {
  return updateObject(state, {
    loading: true
  });
}

const fetchOrdersSuccess = (state,action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
}

const fetchOrdersFail = (state) => {
  return updateObject(state, {
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
      
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action) 
      
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
       
    case actionTypes.PURCHASE_INIT: return purchaseInit(state)
      
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
      
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action)
      
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
      
    default:
      return state;
  }

};

export default reducer