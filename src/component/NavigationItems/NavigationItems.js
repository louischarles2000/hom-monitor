import React from 'react';
import { withRouter } from 'react-router-dom';

import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import ItemsNumber from '../ReusableComps/itemsNumber/itemsNumber';
const navigationItems = props => {
    let classes = [cssClasses.NavigationItems, cssClasses.shut];

    if(props.show){
        classes = [cssClasses.NavigationItems, cssClasses.Open];
    }

    const navigationItems = [
        {link: '/', name: 'home'},
        {link: '/events', name: 'events'},
        {link: '/stationary', name: 'stationary'},
        {link: '/gen-supply', name: 'gen supply'},
        {link: '/building', name: 'building'},
        {link: '/printing', name: 'printing'},
        {link: '/office', name: 'office'},
        {link: '/textile', name: 'textile'},
        {link: '/contacts', name: 'customers'},
    ]
    const getUnreadMessages = (service) => {
        service = service.split('').filter(el => el !== '/').join('');
        const unreadMessages = [];
        if(service === 'gen-supply'){
            service = 'general Supply';
        }
        if(props.unread !== null){
            for(let key in props.unread){
                if(props.unread[key].service === service){
                    unreadMessages.push(props.unread);
                }
            }
    
        }
        return unreadMessages.length;
    }
    console.log(getUnreadMessages('/textile'));
    console.log(props.unread);
    return(
        <nav className={classes.join(' ')}>
            {navigationItems.map(item => (
                <div key={item.link} className={cssClasses.NavItem} onClick={props.clicked}>
                    <NavigationItem link={item.link} clicked={props.clicked}>{item.name}</NavigationItem>
                    <ItemsNumber clicked={() => props.history.push(item.link)}>{getUnreadMessages(item.link)}</ItemsNumber>
                </div>
            ))}
        </nav>
    );
}
export default withRouter(navigationItems);