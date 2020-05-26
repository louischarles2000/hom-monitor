import React from 'react';
import { connect } from 'react-redux';

import classes from './contactStatusPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const contactStatusPanel = props => {
    const activeState = active => {
        console.log('ACTIVE CLASS'+active)
        console.log('ACTIVE STATE '+ props.active)
        let cssClasses = [classes.panelTitle, '']

        if(active){
            cssClasses = [classes.panelTitle, classes.ActivePanel]
        }
        return cssClasses;
    };
    console.log('CSS ARRAY'+activeState(1))
    console.log('CSS ARRAY'+activeState(1).join(' '))
    return(
        <div className={classes.contactStatusPanel}>
            {props.panelTitles.map(title => (
                <div 
                    className={activeState(title.active).join(' ')} 
                    key={title.name} 
                    onClick={title.func}>
                    <p><span><FontAwesomeIcon icon={title.icon}/></span> {title.name}</p>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = state => {
    return{
        active: state.records.active
    }
}

export default connect(mapStateToProps)(contactStatusPanel);