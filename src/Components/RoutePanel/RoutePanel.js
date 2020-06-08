import React from 'react';
import classes from './RoutePanel.css';
import Panel from '../contactStatusPanel/contactStatusPanel';

const RoutePanel = props => {
    const panelTitle = [
        {name: 'people', fun: () => props.reset('people'), active: props.active === 'people'},
        {name: 'people out', fun: () => props.reset('people out'), active: props.active === 'people out'},
        {name: 'records', fun: () => props.reset('records'), active: props.active === 'records'},
    ]
    return(
        <div className={classes.RoutePanel}>
            <Panel panelTitles={panelTitle}/>
        </div>
    );
}

export default RoutePanel;