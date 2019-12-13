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
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux'

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        purchased: false,
        loading: false,
        error :false
    }

    componentDidMount = () => {
        // axios.get('https://react-burger-builder-a6531.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients : res.data})
        //     })
        //     .catch(e => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => 
            ingredients[igKey]    
        ).reduce((sum,curr) => sum+curr, 0)
        this.setState({ purchasable: (sum > 0) })
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.props.ings[type] + 1
    //     const updatedIngredients = { ...this.props.ings }
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchasable(updatedIngredients) // calling with updatedIngredients because setState is async and hence its not gurranted to be in updated state when calling this method
    // }

    // removeIngredientHandler = (type) => { 
    //     const updatedCount = this.props.ings[type] - 1
    //     if(updatedCount < 0) { return; } 
    //     const updatedIngredients = { ...this.props.ings }
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})    
    //     this.updatePurchasable(updatedIngredients)
    // }

    purchasingHandler = () => {
        this.setState({purchasing:true})        
    }

    purchasingCancelerhandler = () => {
        this.setState({purchasing:false})        
    }

    purchasingContinuehandler = () => {
        const queryParams = []
        for (let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + (this.state.totalPrice))
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
}

    render() {
        let disabledInfo = { ...this.props.ings }
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        let orderSummary = null
        let burger = this.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.props.ings) {
            orderSummary = <OrderSummary summaryObj={this.props.ings} 
                purchaseCancel={this.purchasingCancelerhandler}
                purchaseContinue={this.purchasingContinuehandler}
                price={this.state.totalPrice}
            />

            burger = (
                <div className={classes.container}>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientsAdded={this.props.addIngredientHandler} 
                        ingredientsRemoved={this.props.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchasingHandler}
                    />
                </div>
            )
        }

        if(this.state.loading) { 
            orderSummary = <Spinner />
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
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredient => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient}),
        removeIngredientHandler: ingredient => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(withRouter(BurgerBuilder),axios))

