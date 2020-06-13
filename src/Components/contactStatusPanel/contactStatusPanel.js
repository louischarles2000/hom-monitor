import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './contactStatusPanel.css';

const Panel = props => {
    const route = props.location.pathname;
    let cssCls = [classes.panelTitle, '']
    // console.log(route)
    // console.log('link = ' + props.link)
    if(route === props.link){
        cssCls = [classes.panelTitle, classes.Active]
    }
    const goto  = () => {
        props.history.push(props.link);
    }
    return (
        <li className={cssCls.join(' ')} onClick={goto  }>
            <NavLink
                to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}


export default withRouter(Panel);