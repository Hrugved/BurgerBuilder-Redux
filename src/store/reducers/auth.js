import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'

const initialState = {
  userId: null,
  idToken: null,
  error: null,
  loading: false
}

const authStart = (state) => {
  return updateObject(state, {loading: true})
}

const authSuccess = (state,action) => {
  return updateObject(state, {
    loading: false,
    userId: action.userId,
    idToken: action.idToken,
    error: null
  })
}

const authFail = (state,action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state) => {
  return updateObject(state, {
    userId : null,
    idToken: null
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
    case actionTypes.AUTH_FAIL: return authFail(state,action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state)
    default: return state
  }
}

export default reducer