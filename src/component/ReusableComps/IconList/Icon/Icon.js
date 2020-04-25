import React, { useState } from 'react';

import cssClasses from './Icon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = props => {
    const [classes, steClasses] = useState([cssClasses.text, cssClasses.invisible])
    const showHandler = () => {
        steClasses([cssClasses.text, cssClasses.visible]);
    }
    const hideHandler = () => {
        steClasses([cssClasses.text, cssClasses.invisible])
    }
    return(
        <div className={cssClasses.Icon} 
            onMouseOver={showHandler} 
            onMouseOut={hideHandler}
            onClick={props.clicked}>
            <p><FontAwesomeIcon icon={props.icon}/></p>
            <div className={classes.join(' ')}>
                <p>{props.text}</p>
            </div>
            
        </div>
    );
}

export default Icon;