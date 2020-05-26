import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';

import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import ItemsNumber from '../ReusableComps/itemsNumber/itemsNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const navigationItems = props => {
    let classes = [cssClasses.NavigationItems, cssClasses.shut];
    const [unread, setUnread] = useState();
    const propUnread = props.unread;
    useEffect(() => {
        setUnread(propUnread);
    }, [propUnread]);
    if(props.show){
        classes = [cssClasses.NavigationItems, cssClasses.Open];
    }
// console.log(unread);
    const icon = <span><FontAwesomeIcon icon={faHome}/>  Home</span>;
    const navigationItems = [
        {link: '/', name: icon},
        {link: '/events', name: 'events'},
        {link: '/stationary', name: 'stationary'},
        {link: '/gen-supply', name: 'gen supply'},
        {link: '/building', name: 'building'},
        {link: '/printing', name: 'printing'},
        {link: '/office', name: 'office'},
        {link: '/textile', name: 'textile'},
        {link: '/records', name: 'Records'},
    ]
    const getUnreadMessages = (service) => {
        service = service.split('').filter(el => el !== '/').join('');
        const unreadMessages = [];
        if(service === 'gen-supply'){
            service = 'general Supply';
        }
        if(unread !== null){
            for(let key in unread){
                if(unread[key].service === service){
                    unreadMessages.push(    unread);
                }
            }
    
        }
        return unreadMessages.length;
    }
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