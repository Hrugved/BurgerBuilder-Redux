import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Switch,Route} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onAuthCheck()
  }

  render() {
    let routes = null
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    }

    return (
        <Layout>
          {routes}
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(actions.authCheck())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
