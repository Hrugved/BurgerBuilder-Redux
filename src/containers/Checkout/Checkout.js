import React , {Component} from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
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
        let summary = <Redirect to="/"/>
        if(this.props.ings) {
            const purchaseRedirect = (this.props.purchased) ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        cancelled = {this.checkoutCancelHandler}
                        continued = {this.checkoutContinueHandler}
                    />  
                    <Route path='/checkout/contact-data' component={ContactData}/>
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)