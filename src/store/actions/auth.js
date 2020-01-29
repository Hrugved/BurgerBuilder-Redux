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
  localStorage.removeItem('token')
  localStorage.removeItem('expiresAt')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = (time) => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), time)
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
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expiresAt', Date.now()+res.data.expiresIn*1000)
        localStorage.setItem('userId', res.data.localId)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(authTimeout(res.data.expiresIn*1000))
      })
      .catch(e => {
        dispatch(authFail(e))
      })
  }
}

export const authCheck = () => {
  return dispatch => {
    if(localStorage.token && localStorage.expiresAt > Date.now()) {
        dispatch(authSuccess(localStorage.token, localStorage.userId))
        dispatch(authTimeout(localStorage.expiresAt - Date.now())) // remaining 1hr
    } else {
      dispatch(authLogout())
    }
  }
}
