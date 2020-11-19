import React from 'react';
import classes from './RoutePanel.css';
import PanelItem from '../contactStatusPanel/contactStatusPanel';

const RoutePanel = props => {
    // const panelTitle = [
    //     {name: '/people', fun: () => props.reset('people'), active: props.active === 'people'},
    //     {name: '/people-out', fun: () => props.reset('people out'), active: props.active === 'people out'},
    //     {name: '/records', fun: () => props.reset('records'), active: props.active === 'records'},
    // ]
    const routes = [
        {name: 'People', link:'/people'},
        {name: 'People Out', link:'/people-out'},
        {name: 'Records', link:'/records'},
    ]
    return(
        <div className={classes.RoutePanel}>
            {routes.map(route => (
                // <li>something</li>
                <PanelItem 
                    key={route.link}
                    link={route.link}>
                        {route.name}
                </PanelItem>
            ))}
        </div>
    );
}

export default RoutePanel;