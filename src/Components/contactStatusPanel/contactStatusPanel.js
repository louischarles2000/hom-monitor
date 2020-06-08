import React from 'react';

import classes from './contactStatusPanel.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const contactStatusPanel = props => {
    const activeState = active => {
        // console.log('ACTIVE CLASS'+active)
        // console.log('ACTIVE STATE '+ props.active)
        let cssClasses = [classes.panelTitle, '']

        if(active){
            cssClasses = [classes.panelTitle, classes.ActivePanel]
        }
        return cssClasses;
    };
    // console.log('CSS ARRAY'+activeState(1))
    // console.log('CSS ARRAY'+activeState(1).join(' '))
    // <FontAwesomeIcon icon={title.icon}/></span>
    return(
        <div className={classes.contactStatusPanel}>
            {props.panelTitles.map(title => (
                <div 
                    className={activeState(title.active).join(' ')} 
                    key={title.name} 
                    onClick={title.fun}>
                    <p>{title.name}</p>
                </div>
            ))}
        </div>
    );
}


export default contactStatusPanel;