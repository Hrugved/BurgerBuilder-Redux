import React , { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import {withRouter} from 'react-router-dom'
import classes from './BurgerBuilder.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        purchased: false
    }

    componentDidMount() {
        this.props.initIngredientHandler()
    }

    updatePurchasable = () => {
        const sum = Object.keys(this.props.ings).map(igKey => 
            this.props.ings[igKey]    
        ).reduce((sum,curr) => sum+curr, 0)
        return (sum > 0)
    }

    purchasingHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true}) 
        } else {
            this.props.history.push('/login')
        }       
    }

    purchasingCancelerhandler = () => {
        this.setState({purchasing:false})        
    }

    purchasingContinuehandler = () => {
        this.props.initPurchasehandler()
        this.props.history.push('/checkout')
}

    render() {
        let disabledInfo = { ...this.props.ings }
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        } 

        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.props.ings) {
            orderSummary = <OrderSummary summaryObj={this.props.ings} 
                purchaseCancel={this.purchasingCancelerhandler}
                purchaseContinue={this.purchasingContinuehandler}
                price={this.props.price}
            />

            burger = (
                <div className={classes.container}>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientsAdded={(ing) => this.props.addIngredientHandler(ing)} 
                        ingredientsRemoved={(ing) => this.props.removeIngredientHandler(ing)}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable()}  
                        purchasing={this.purchasingHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </div>
            )
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} backdropClicked={this.purchasingCancelerhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredient => dispatch(actions.addIngredient(ingredient)),
        removeIngredientHandler: ingredient => dispatch(actions.removeIngredient(ingredient)),
        initIngredientHandler: () => dispatch(actions.initIngredients()),
        initPurchasehandler: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(withRouter(BurgerBuilder),axios))

