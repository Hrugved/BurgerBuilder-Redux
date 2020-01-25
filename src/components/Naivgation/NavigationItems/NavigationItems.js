import React from 'react'
import classes from './NavigationItem.module.css'
import NavigationItem from './NavigationItem/navigationItem'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            <NavigationItem link='/login'>Login</NavigationItem>
        </ul>
    )
}

export default NavigationItems