import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

const addIngredient = (state,action) => {
    const updatedIngredients = updateObject(state.ingredients,{
        [action.ingredient]: state.ingredients[action.ingredient] + 1
    })
    return updateObject(state,{
        ingredients: updatedIngredients, 
        totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredient]).toFixed(2),
        building: true
    })
}

const removeIngredient = (state,action) => {
    const updatedIngredients = updateObject(state.ingredients,{
        [action.ingredient]: state.ingredients[action.ingredient] - 1
    })
    return updateObject(state,{
        ingredients: updatedIngredients, 
        totalPrice: +(state.totalPrice - INGREDIENT_PRICES[action.ingredient]).toFixed(2),
        building: true
    })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        buildinga: false 
    }) 
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT : return addIngredient(state,action)
            
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state,action)
            
        case actionTypes.SET_INGREDIENTS : return setIngredients(state,action) 
            
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state) 
            
        default:
            return state
    }
} 

export default reducer