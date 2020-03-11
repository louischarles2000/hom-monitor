import React from 'react';

import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => {
    let classes = [cssClasses.NavigationItems, cssClasses.shut];

    if(props.show){
        classes = [cssClasses.NavigationItems, cssClasses.Open];
    }

    
    return(
        <nav className={classes.join(' ')}>
            <NavigationItem link="/" clicked={props.remove}>HOME</NavigationItem>
            <NavigationItem link="/events" clicked={props.remove}>EVENTS</NavigationItem>
            <NavigationItem link="/stationary" clicked={props.remove}>STATIONARY</NavigationItem>
            <NavigationItem link="/gen-supply" clicked={props.remove}>GEN SUPPLY</NavigationItem>
            <NavigationItem link="/building" clicked={props.remove}>BUILDING</NavigationItem>
            <NavigationItem link="/printing" clicked={props.remove}>PRINTING</NavigationItem>
            <NavigationItem link="/office" clicked={props.remove}>OFFICE</NavigationItem>
            <NavigationItem link="/textile" clicked={props.remove}>TEXTILE</NavigationItem>
            <NavigationItem link="/contact-us" clicked={props.remove}>CONTACT US</NavigationItem>
        </nav>
    );
}
export default navigationItems;