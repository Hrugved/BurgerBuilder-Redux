import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/spinner/spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

class Auth extends Component {

  configElement = (elementType,type,placeholder,value,options,validation,isValid) => {
    return ({
        elementType,
        elementConfig: {
            type,
            placeholder,
            options
        },
        value,
        validation,
        isValid,
        touched: false
    })
  } 

  checkValidity(value,validation) { 
    let isValid = true
    value = value.trim()
    if(validation.required){
        isValid = value !== '' && isValid
    }
    if(validation.len){
        isValid = value.length === validation.len && isValid
    }
    if(validation.minLen){
      isValid = value.length >= validation.minLen && isValid
    }
    if(validation.isEmail){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(value).toLowerCase()) && isValid
    }
    return isValid
  }

  state = {
    controls: {
      email : this.configElement('input','email','Your Email','',null, {
        required: true,
        isEmail: true
      }),
      password: this.configElement('input','password','password','',null,{
        required: true,
        minLen: 6
      })
    },
    isSignupMode: true
  }

  inputChangeHandler = (inputIdentifier,event) => {
    const updatedInputForm = {...this.state.controls}
    const updatedInputElement = {...updatedInputForm[inputIdentifier]}
    updatedInputElement.value = event.target.value
    if(updatedInputElement.validation){
        updatedInputElement.isValid = this.checkValidity(updatedInputElement.value,updatedInputElement.validation)
    }
    updatedInputElement.touched = true
    updatedInputForm[inputIdentifier] = updatedInputElement
    
    this.setState({controls: updatedInputForm})
  }

  switchAuthMode = () => {
    this.setState({isSignupMode: !this.state.isSignupMode})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignupMode)
  }

  render() {
    const formElements = Object.keys(this.state.controls).map(key => {
      const obj = this.state.controls[key]
      return(
          <Input elementType={obj.elementType} 
              elementConfig={obj.elementConfig}  
              value={obj.value}  
              Invalid={!obj.isValid}
              shouldValidate={obj.validation ? true : false}
              touched={obj.touched}
              key={key}
              changed={(event) => this.inputChangeHandler(key,event)}    
          />
      )
    }) 

    let form = (
          <form onSubmit={this.submitHandler}>
              {formElements}
              <Button type="Success">{this.state.isSignupMode ? 'SignUp' : 'Login'}</Button>
          </form>
        )
    if(this.props.loading) {
        form = <Spinner />
    }

    let redirect = null
    if(this.props.isAuthenticated) {
      if(this.props.buildingBurger) {
        redirect = <Redirect to='/checkout' />
      }
      else {
        redirect = <Redirect to='/' />
      }
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {form}
        <Button clicked={this.switchAuthMode} type="Success">Switch to {this.state.isSignupMode ? 'Login' : 'SignUp'}</Button>
        {this.props.loading ? <Spinner/> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email,password,isSignupMode) => dispatch(actions.auth(email,password,isSignupMode))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)