import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const authSuccess = (idToken,userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = (time) => {
  return dispatch => {
    setTimeout( () => dispatch(authLogout()), time)
  }
}

export const auth = (email,password,isSignupMode) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    if(!isSignupMode) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }
    axios.post(url, authData)
      .then(res => {
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(authTimeout(res.data.expiresIn*1000))
      })
      .catch(e => {
        dispatch(authFail(e))
      })
  }
}