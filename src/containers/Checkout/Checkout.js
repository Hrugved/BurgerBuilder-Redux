import React , {Component} from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props.ings)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    cancelled = {this.checkoutCancelHandler}
                    continued = {this.checkoutContinueHandler}
                />  
                <Route path='/checkout/contact-data' component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps )(Checkout)