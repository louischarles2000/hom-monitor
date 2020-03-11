import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = props => {
    return(
        <li className={classes.NavigationItem} onClick={props.clicked}>
        <NavLink
            to={props.link}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
    );
}

export default navigationItem;