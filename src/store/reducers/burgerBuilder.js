import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredient]).toFixed(2)
            }
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: +(state.totalPrice - INGREDIENT_PRICES[action.ingredient]).toFixed(2)
            }
        case actionTypes.SET_INGREDIENTS : 
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED : 
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
} 

export default reducer